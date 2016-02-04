var objects;
(function (objects) {
    var Control = (function () {
        function Control(rotationX, rotationY, rotationZ, shirt, skin, pants) {
            this.rotationX = rotationX;
            this.rotationY = rotationY;
            this.rotationZ = rotationZ;
            this.shirt = shirt;
            this.skin = skin;
            this.pants = pants;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map