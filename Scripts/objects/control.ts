module objects {
	export class Control {
		rotationX: number;
        rotationY: number;
        rotationZ: number;
        //color: number;
		constructor(rotationX: number, rotationY: number, rotationZ: number) {
			this.rotationX = rotationX;
            this.rotationY = rotationY;
            this.rotationZ = rotationZ;
            //this.color=color;
		}
	}
}
