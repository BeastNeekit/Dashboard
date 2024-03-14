// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/UserModel');
const AdminModel = require('./models/AdminModel');
const fs = require('fs');


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/uploads/profilePictures', express.static(path.join(__dirname, 'public/uploads/profilePictures')));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.headers.username || 'unknown_user';
        const userDirectory = `public/uploads/profilePictures/${username}`;

        if (!fs.existsSync(userDirectory)) {
            fs.mkdirSync(userDirectory, { recursive: true });
        }

        cb(null, userDirectory);
    },
    filename: (req, file, cb) => {
        const originalFilename = 'profilePicture.jpg';
        cb(null, originalFilename);
    },
});


const profilePictureUpload = multer({
    storage: profilePictureStorage,
}).single('profilePicture');



app.post('/uploadProfilePicture', profilePictureUpload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No profile picture uploaded' });
        }

        const username = req.headers.username || 'unknown_user';
        const originalFilename = req.file.originalname;
        const filePath = `uploads/profilePictures/${username}/${originalFilename}`;

        // Update the user's profile picture path in the file system
        await fs.rename(req.file.path, path.join(__dirname, 'public', filePath));

        res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.get('/getProfilePicture', (req, res) => {
    const { username } = req.query;

    try {
        const profilePicturePath = path.join(__dirname, `public/uploads/profilePictures/${username}`);

        // Check if the directory exists
        if (fs.existsSync(profilePicturePath)) {
            const files = fs.readdirSync(profilePicturePath);

            if (files.length > 0) {
                const profilePictureUrl = `http://localhost:5000/uploads/profilePictures/${username}/${files[0]}`;
                res.status(200).json({ profilePicture: profilePictureUrl });
            } else {
                res.status(404).json({ message: 'Profile picture not found' });
            }
        } else {
            res.status(404).json({ message: 'Profile picture directory not found' });
        }
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const upload = multer({
    storage: storage,
});

app.post('/uploads', upload.single('file'), async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await UserModel.create({
            name,
            email,
            image: {
                originalFilename: req.file.originalname,
            },
        });
        res.status(201).json({ message: 'File uploaded successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/getImage', async (req, res) => {
    try {
        const users = await UserModel.find({}, { _id: 1, name: 1, email: 1, image: 1 });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        const usersWithImageURLs = users.map((user) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            imageUrl: `http://localhost:5000/uploads/${user.image.originalFilename}`,
        }));

        res.json(usersWithImageURLs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newAdmin = new AdminModel({ username, password, lastLogin: null });
        await newAdmin.save();
        res.status(201).send('Admin registered successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ username });

        if (admin && admin.password === password) {
            // Update lastLogin field with the current date and time
            admin.lastLogin = Date.now();
            await admin.save();
            res.status(200).send('Login successful.');
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/changePassword', async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;

    try {
        const admin = await AdminModel.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Check if the current password matches
        if (admin.password !== currentPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update the password
        admin.password = newPassword;
        await admin.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/getAdminUsers', async (req, res) => {
    try {
        const adminUsers = await AdminModel.find({}, { _id: 1, username: 1, lastLogin: 1, profilePicture: 1 });

        if (!adminUsers || adminUsers.length === 0) {
            return res.status(404).json({ message: 'No admin users found' });
        }

        const adminUsersWithImageURLs = adminUsers.map((adminUser) => ({
            _id: adminUser._id,
            username: adminUser.username,
            lastLogin: adminUser.lastLogin,
            imageUrl: `http://localhost:5000/uploads/profilePictures/${adminUser.username}/profilePicture.jpg`,
        }));

        res.json(adminUsersWithImageURLs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});








app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const user = await UserModel.create({
            name,
            email,
            password,
        });


        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Assuming you have a UserModel that has fields: name, email, and password

app.post('/api/login', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Check if the identifier is an email or username
        const isEmail = identifier.includes('@');
        let user;

        if (isEmail) {
            // If it's an email, find the user by email
            user = await UserModel.findOne({ email: identifier, password });
        } else {
            // If it's a username, find the user by username
            user = await UserModel.findOne({ name: identifier, password });
        }

        if (user) {
            // Return user information on successful login
            res.json({
                name: user.name,
                message: 'Login successful',
            });
        } else {
            res.status(401).json({ message: 'Invalid email, username, or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
