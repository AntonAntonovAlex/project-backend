const EventEmitter = require('events');

class CommentService extends EventEmitter {
    constructor() {
        super();
    };

    addComment(comment) {
        this.emit('commentAdded', comment);
    };

    onCommentAdded(callback) {
        this.on('commentAdded', callback);
    };
};

module.exports = new CommentService();
