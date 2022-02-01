import { CreateActiviteDto } from './create-activite.dto';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ActivityType } from '../entities/activite.entity';

@ValidatorConstraint({ name: 'customText', async: false })
export class ValidationDist implements ValidatorConstraintInterface {
  validate(text: number, args: ValidationArguments) {

    const obj = (args.object as CreateActiviteDto);
    if( obj.type ==  ActivityType.RUN  && obj.dist < 5000) {
      return  false;
    } else if( obj.type ==  ActivityType.SWIM  && obj.dist < 500) {
      return  false;
    } if( obj.type ==  ActivityType.BIKE  && obj.dist < 15000 ) {
      return  false;
    } else {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const obj = (args.object as CreateActiviteDto);
    const v1 = obj.type ;
    let v2 = "" ;
    
    switch ( obj.type ) {
      case ActivityType.SWIM:
          v2 = "500 m"
          break;
      case ActivityType.BIKE:
          v2 = "15 kms"
          break;
      case ActivityType.RUN:
          v2 = "5 kms"
          break;
    }

    return `Pour ${v1} la distance doit etre au minmun de ${v2}`;
  }


}