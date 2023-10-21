var user = new mongoose.Schema({
     username: { type: String, lowercase: true, unique: true },
     email: { type: String, lowercase: true, unique: true },
     password: String,
     is_active: { type: Boolean, default: false },
});

var room = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,
    users: [user],
    messages: [message],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

var message = new mongoose.Schema({
    room: room,
    user: user,
    message_body: String,
    message_status:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});