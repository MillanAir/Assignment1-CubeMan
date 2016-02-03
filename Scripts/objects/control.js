var objects;
(function (objects) {
    var Control = (function () {
        function Control(rotationSpeed, bouncingSpeed) {
            this.rotationSpeed = rotationSpeed;
            this.bouncingSpeed = bouncingSpeed;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map