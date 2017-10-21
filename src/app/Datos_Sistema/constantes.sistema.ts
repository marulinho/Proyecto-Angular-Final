export class ConstantesSistemas{
    
    idFinca:number;
    idSector:number;
    idCultivo:number;
    idMecanismoRiegoFincaSector:number;
    idUsuarioFinca:number;
    idComponenteSensor:number;
    idSensor:number;
    idConfiguracionRiego:number;

    public setIdFinca(idFinca):void{
        this.idFinca=idFinca;
    }

    public setIdSector(idSector):void{
        this.idSector=idSector;
    }

    public setIdCultivo(idCultivo):void{
        this.idCultivo=idCultivo;
    }

    public setIdMecanismoRiegoFincaSector(idMecanismoRiegoFincaSector):void{
        this.idMecanismoRiegoFincaSector=idMecanismoRiegoFincaSector;
    }

    public setIdUsuarioFinca(idUsuarioFinca):void{
        this.idUsuarioFinca=idUsuarioFinca;
    }

    public setIdComponenteSensor(idComponenteSensor):void{
        this.idComponenteSensor=idComponenteSensor;
    }

    public setIdSensor(idSensor):void{
        this.idSensor=idSensor;
    }

    public setIdConfiguracionRiego(idConfiguracionRiego):void{
        this.idConfiguracionRiego=idConfiguracionRiego;
    }
    


    public getIdFinca():number{
        return this.idFinca;
    }

    public getIdCultivo():number{
        return this.idCultivo;
    }

    public getIdMecanismoRiegoFincaSector():number{
        return this.idMecanismoRiegoFincaSector;
    }

    public getIdUsuarioFinca():number{
        return this.idUsuarioFinca;
    }

    public getIdComponenteSensor():number{
        return this.idComponenteSensor;
    }

    public getIdSensor():number{
        return this.idSensor;
    }

    public getIdConfiguracionRiego():number{
        return this.idConfiguracionRiego;
    }

}