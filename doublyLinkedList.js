/*----------------------- List class --------------------*/

function List() {
    if (!(this instanceof List)) {
        return new List();
    };

    this.head = null;
    this.tail = null;

    this._isReversed = false;
    this.count = 0;

    var iterator;
    this.getIterator = function () {
        if (!iterator) {
            iterator = new Iterator(this);            
        };
        iterator.reset();
        return iterator;
    };    
};

function ListItem(value, prev, next) {
    if (!(this instanceof ListItem)) {
        return new ListItem();
    };

    this.value = value;
    this.prev = prev;
    this.next = next;
};

// i think this implementation is a bit faster than implementation with "reverseItems" function below
List.prototype.reverse = function () {
    this._isReversed = !this._isReversed;
    return this;
};

List.prototype.reverseItems = function () {    
    var item = this.tail,
        temp;
    this.tail = this.head;
    this.head = item;

    do {
        temp = item.next;
        item.next = item.prev;
        item.prev = temp;

        item = item.prev;
    } while (item);

    return this;
};

List.prototype.append = function (value) {
    if (!this.head) {
        this.head = this._putItemBetween(value, null, null);
        this.tail = this.head;
    } else {
        this._attachItemToEnd(value);
    };

    return this;
};

List.prototype.prepend = function (value) {
    this._attachItemToBegin(value);
    return this;
};

List.prototype.deleteAt = function (position) {

    if (!this.count) {
        return this;
    };

    if (position > this.count || position < 0) {
        throw new RangeError("deleteAt: Index was out of range: " + position);
    };

    if (this.count === 1) {
        this.head = null;
        this.tail = null;
        this.count--;
        return this;
    };

    var iterator = this.getIterator();

    while (iterator.moveNext()) {
        if (iterator.index === position) {
            this._deleteItemBetween(iterator.current, iterator.current.prev, iterator.current.next);
            break;
        };
    };

    this.count--;

    return this;
};

List.prototype.at = function (index) {
    if (index >= this.count || index < 0) {
        throw new RangeError("Index was out of range.");
    };

    var iterator = this.getIterator();

    while (iterator.moveNext()) {
        if (iterator.index === index) {
            return iterator.current.value;
        };
    };
};

List.prototype.insertAt = function (item, position) {
    if (position > this.count || position < 0) {
        throw new RangeError("insertAt: Index was out of range: " + position);
    };

    if (position === this.count) {
        this._attachItemToEnd(item);
        return this;
    };

    if (position === 0) {
        this._attachItemToBegin(item);
        return this;
    };

    var iterator = this.getIterator();
    while (iterator.moveNext()) {
        if (iterator.index === position) {           
            if (!this._isReversed) {
                this._putItemBetween(item, iterator.current.prev, iterator.current);
            }
            else {
                this._putItemBetween(item, iterator.current, iterator.current.next);
            }
            break;
        };
    };

    return this;
};

List.prototype.each = function (func) {
    var type = typeof func;
    if (!(type === "function")) {
        throw new TypeError("Function expected as parameter, but " + type + " was arrived.");
    }

    var iterator = this.getIterator();

    while (iterator.moveNext()) {
        iterator.current = func(iterator.current.value);
    };

    return this;
};

List.prototype.indexOf = function (value) {
    var iterator = this.getIterator();

    while (iterator.moveNext()) {
        if (iterator.current.value === value) {
            return iterator.index;
        };
    };

    return -1;
}

List.prototype._attachItemToEnd = function (value) {
    if (!this._isReversed) {
        this.head = this._putItemBetween(value, this.head, null);
    } else {
        this.tail = this._putItemBetween(value, null, this.tail);
    };
};

List.prototype._attachItemToBegin = function (value) {
    this._isReversed = !this._isReversed;
    this._attachItemToEnd(value);
    this._isReversed = !this._isReversed;
};

List.prototype._putItemBetween = function (value, prev, next) {
    var newItem = new ListItem(value, prev, next);

    if (prev) prev.next = newItem;
    if (next) next.prev = newItem;

    this.count++;

    return newItem;
};

List.prototype._deleteItemBetween = function (current, prev, next) {

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    if (this.head === current) this.head = current.prev;
    if (this.tail === current) this.tail = current.next;
};

/*----------------------- End of List class ---------------------*/

/*----------------------- Iterator class ------------------------*/

function Iterator(list) {
    this.list = list;
    this.current = null;
    this.index = -1;
}

Iterator.prototype.moveNext = function () {
    if (this.current === null) {
        if (!list._isReversed) {
            this.current = list.tail;
        } else {
            this.current = list.head;
        };

        this.index++;
        return this.current;
    }

    this.current = !(list._isReversed) ? this.current.next : this.current.prev;

    if (this.current !== null) {
        this.index++;
    }

    return this.current;
};

Iterator.prototype.reset = function () {
    this.index = -1;
    this.current = null;
    return this;
};

/*----------------------- End of Iterator class ------------------*/

/*----------------------- Usage ----------------------------------*/


function printList(list) {
    console.log("-----Begin-----");
    var iterator = list.getIterator();

    while (iterator.moveNext()) {
        console.log(iterator.current.value);
    };
    console.log("------End------");
};

var list = new List();       
                                                // ** - start point for iteration
list.append(0).append(1).append(2)              // ** 0 -> 1 -> 2
    .reverse().deleteAt(2).append(10)           // 10 -> 1 -> 2 ** 
    .reverse().append(11).deleteAt(1)           // ** 10 -> 2 -> 11
    .reverse().insertAt(4, 3).insertAt(5, 0)    // 4 -> 10 -> 2 -> 11 -> 5 **
    .reverse().insertAt(8, 0);                  // ** 8 -> 4 -> 10 -> 2 -> 11 -> 5
                                                                                                      
printList(list);
console.log(list.at(3));                        // 2
console.log(list.reverse().at(3));              // 10       
list.reverse();                                 // original sequence of elements

printList(list);
list.reverseItems();
printList(list);