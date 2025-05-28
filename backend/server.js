const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");
const path = require('path');

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// MongoDB setup
const uri = process.env.MONGO_KEY || "mongodb+srv://gy523314:%40genwarrior123%40@cluster0.3e0eraj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let db;

client.connect().then(() => {
    try{
        db = client.db('blog-app');
        console.log('✅ MongoDB connected to blog-app');
    }
    catch{
        console.log('❌ MongoDB connection failed');
    }
});

// JWT verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token required');
    jwt.verify(token, process.env.JWT_SECRET || 'secret123', (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.userId = decoded.id;
        next();
    });
};

// ================= Routes =================

// Signup
app.post('/api/auth/signup', upload.single('profileImage'), async (req, res) => {
    const { email, password } = req.body;
    const users = db.collection('users');
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).send('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    await users.insertOne({
        email,
        password: hashed,
        profileImage: req.file.filename
    });

    res.status(201).send('User registered');
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
    res.json({ token, user });
});

// Get current user
app.get('/api/auth/me', verifyToken, async (req, res) => {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.userId) });
    res.json(user);
});

// Create Blog
app.post('/api/blogs', verifyToken, upload.single('image'), async (req, res) => {
    const blog = {
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename,
        userId: req.userId,
        comments: []
    };
    await db.collection('blogs').insertOne(blog);
    res.status(201).json(blog);
});

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    const blogs = await db.collection('blogs').find().toArray();
    res.status(200).json(blogs);
});

// Get single blog
app.get('/api/blogs/:id', async (req, res) => {
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(req.params.id) });
    res.json(blog);
});

// Update blog
app.put('/api/blogs/:id', verifyToken, async (req, res) => {
    await db.collection('blogs').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send('Blog updated');
});

// Delete blog
app.delete('/api/blogs/:id', verifyToken, async (req, res) => {
    await db.collection('blogs').deleteOne({ _id: new ObjectId(req.params.id) });
    res.send('Blog deleted');
});

// Add comment
app.post('/api/blogs/:id/comment', verifyToken, async (req, res) => {
    const comment = {
        user: req.body.user,
        comment: req.body.comment,
        replies: []
    };
    await db.collection('blogs').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $push: { comments: comment } }
    );
    res.send('Comment added');
});

// Add reply
app.post('/api/blogs/:id/reply', verifyToken, async (req, res) => {
    const { commentIndex, user, reply } = req.body;
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(req.params.id) });

    if (blog && blog.comments && blog.comments[commentIndex]) {
        blog.comments[commentIndex].replies.push({ user, reply });
        await db.collection('blogs').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { comments: blog.comments } }
        );
        res.send('Reply added');
    } else {
        res.status(404).send('Comment not found');
    }
});

// Start server
app.listen(5000, () => {
    console.log('🚀 Server running at http://localhost:5000');
});

// Decryption function
function Decrypt(encrypted) {
    const bytes = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}
