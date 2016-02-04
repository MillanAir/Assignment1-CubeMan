var objects;
(function (objects) {
    var Control = (function () {
        //color: number;
        function Control(rotationX, rotationY, rotationZ) {
            this.rotationX = rotationX;
            this.rotationY = rotationY;
            this.rotationZ = rotationZ;
            //this.color=color;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map