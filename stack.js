function Stack() {
    this.head = null;
};

function StackItem(item, prev) {
    this.value = item;
    this.prev = prev;
};

Stack.prototype.push = function (item) {
    this.head = new StackItem(item, this.head);
    return this;
};

Stack.prototype.pop = function () {
    if (this.head) {
        var value = this.head.value;
        this.head = this.head.prev;
        return this.head.value;
    };
    throw new Error("Stack is empty.");
};

Stack.prototype.peek = function () {
    return this.head ? this.head.value : undefined;
};

var stack = new Stack();
stack.push(10);
stack.push(11);
stack.pop();




