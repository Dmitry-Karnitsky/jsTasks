// JavaScript source code
(function () {

    function Dog(name) {
        this.name = name;
    }

    Dog.prototype.bark = function () {
        sayName(this.name);
    }

    Dog.prototype.push = function () {
        var name = this.name;
        setTimeout(function () { sayName(name) }, 3000);
    }

    function sayName(name) {
        console.log(name);
    }

    var jackTheRipper = new Dog("Jack The Ripper");

    jackTheRipper.bark();
    jackTheRipper.push();

})();

