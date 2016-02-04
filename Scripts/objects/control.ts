module objects {
	export class Control {
		rotationX: number;
        rotationY: number;
        rotationZ: number;
        shirt: number; //Hexa-Decimal Value
        skin: number; //Hexa-Decimal Value
        pants: number; //Hexa-Decimal Value
		constructor(rotationX: number, rotationY: number, rotationZ: number, shirt:number, skin:number, pants:number) {
			this.rotationX = rotationX;
            this.rotationY = rotationY;
            this.rotationZ = rotationZ;
            this.shirt=shirt;
            this.skin=skin;
            this.pants=pants;
		}
	}
}
