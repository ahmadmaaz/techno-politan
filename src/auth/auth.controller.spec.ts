import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import PCDto from './dto/pc.dto';
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import { UserDto } from './dto/user.dto';
import { CitizenDto } from './dto/citizen.dto';
import MPDto from './dto/mp.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('signup', () => {
    let target: ValidationPipe = new ValidationPipe({ transform: true, whitelist: true });
    const metadataPC: ArgumentMetadata = {
      type: 'body',
      metatype: PCDto,
      data: ""
    };
    const metadataCitizen: ArgumentMetadata = {
      type: 'body',
      metatype: CitizenDto,
      data: ""
    };
    const metadataMP: ArgumentMetadata = {
      type: 'body',
      metatype: MPDto,
      data: ""
    };
    const userDto:UserDto = {
      id:null,
      firstName: 'ahmad',
      middleName: 'hamza',
      lastName: 'al maaz',
      phoneNumber: '+961 76838889',
      email: 'ahmad@gmail.com',
      dob: new Date('9-6-2005'),
      education: 'high school',
      contactInformation: 'heheh',
      password: 'Ahmad1_@22',
      createdAt:null
    };
    let pc:PCDto={
      ...userDto,
      campaignName: 'HERE WE GO',
      studyField: 'dsadas',
      politicalParty: 'dsadasd',
      biography: 'dasdasdas',
    }
    let citizen:CitizenDto={
      ...userDto,
      occupation: 'Software Engineer',
      placeOfBirth: 'Haret Hreik'
    }
    let mp:MPDto={
      ...userDto,
      position: 'Ra2is wozara',
      startDate: new Date("28-4-2024"),
      endDate:  new Date("28-4-2026"),
      relatedParty: 'Yellow',
      biography: 'Hi ana bl dawleeee '
    }
    afterEach(() => {
      pc={
        ...userDto,
        campaignName: 'HERE WE GO',
        studyField: 'dsadas',
        politicalParty: 'dsadasd',
        biography: 'dasdasdas',
      }
      citizen={
        ...userDto,
        occupation: 'Software Engineer',
        placeOfBirth: 'Haret Hreik'
      }
      mp={
        ...userDto,
        position: 'Ra2is wozara',
        startDate: new Date("4-4-2024"),
        endDate:  new Date("4-4-2026"),
        relatedParty: 'Yellow',
        biography: 'Hi ana bl dawleeee '
      }
    });
    it('DTO validation - invalid phone number ', async () => {  
      pc.phoneNumber="767838889";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["phoneNumber must be a valid phone number"])
        })
    });
    it('DTO validation - invalid email ', async () => {  
      pc.email="hi ana email";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["email must be an email"])
        })
    });
    it('DTO validation - weak password ', async () => {  
      pc.password="password123";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["password is not strong enough"])
        })
    });
    it('DTO validation - firstName empty ', async () => {  
      pc.firstName="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["firstName should not be empty"])
        })
    });
    it('DTO validation - middleName empty ', async () => {  
      pc.middleName="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["middleName should not be empty"])
        })
    });
    it('DTO validation - lastName empty ', async () => {  
      pc.lastName="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["lastName should not be empty"])
        })
    });
    it('DTO validation - email empty ', async () => {  
      pc.email="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["email must be an email"])
        })
    });
    it('DTO validation - education empty ', async () => {  
      pc.education="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["education should not be empty"])
        })
    });
    it('DTO validation - phoneNumber empty ', async () => {  
      pc.phoneNumber="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["phoneNumber must be a valid phone number"])
        })
    });
    it('DTO validation - contactInformation empty ', async () => {  
      pc.contactInformation="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["contactInformation should not be empty"])
        })
    });
    it('DTO validation - password empty ', async () => {  
      pc.password="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["password should not be empty","password is not strong enough"])
        })
    });

    it('DTO validation - campaignName empty ', async () => {  
      pc.campaignName="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["campaignName should not be empty"])
        })
    });
    it('DTO validation - studyField empty ', async () => {  
      pc.studyField="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["studyField should not be empty"])
        })
    });
    it('DTO validation - politicalParty empty ', async () => {  
      pc.politicalParty="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["politicalParty should not be empty"])
        })
    });
    it('DTO validation - biography empty ', async () => {  
      pc.biography="";
      await target.transform(pc, metadataPC)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["biography should not be empty"])
        })
    });
    it('DTO validation - occupation empty ', async () => {  
      citizen.occupation="";
      await target.transform(citizen, metadataCitizen)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["occupation should not be empty"])
        })
    });
    it('DTO validation - placeOfBirth empty ', async () => {  
      citizen.placeOfBirth="";
      await target.transform(citizen, metadataCitizen)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["placeOfBirth should not be empty"])
        })
    });

    it('DTO validation - position empty ', async () => {  
      mp.position="";
      await target.transform(mp, metadataMP)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["position should not be empty"])
        })
    });
    it('DTO validation - relatedParty empty ', async () => {
      mp.relatedParty="";
      await target.transform(mp, metadataMP)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["relatedParty should not be empty"])
        })
    });
    it('DTO validation - biography empty ', async () => {  
      mp.biography="";
      await target.transform(mp, metadataMP)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["biography should not be empty"])
        })
    });
    it('DTO validation - startDate undfined ', async () => {  
      mp.startDate=undefined;
      await target.transform(mp, metadataMP)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["startDate must be a Date instance"])
        })
    });
    it('DTO validation - endDate undfined ', async () => {  
      mp.endDate=undefined;
      await target.transform(mp, metadataMP)
        .catch(err => {
            expect(err.getResponse().message).toEqual(["endDate must be a Date instance"])
        })
    });
  });
  
  describe("login",()=>{

    it('it should return login successful with status 200', async () => {

      const userData = { email: "ahmad1@gmail.com", password:"Ahmad123_@" };
  
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as  any;
  

      jest.spyOn(authService, 'loginUser').mockImplementationOnce(async () => responseMock.status(200).json({ message: 'Login successful' }));
      await controller.loginUser(userData, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith({ message: 'Login successful' }); 
    });
    it('it should return invalid credentials with status code ', async () => {

      const userData = { email: "ahmad1@gmail.com", password:"Ahmad" }; // existing account but invalid password
  
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as  any;
  
      jest.spyOn(authService, 'loginUser').mockImplementationOnce(async () => responseMock.status(401).json({ message: 'Invalid Credentials.' }));
      await controller.loginUser(userData, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(401);
      expect(responseMock.json).toHaveBeenCalledWith({ message: 'Invalid Credentials.' }); 
    });
    it('it should return invalid credentials with status code ', async () => {

      const userData = { email: "invalid@gmail.com", password:"invaaaliddd" };
  
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as  any;
  
      jest.spyOn(authService, 'loginUser').mockImplementationOnce(async () => responseMock.status(401).json({ message: 'Invalid Credentials.' }));
      await controller.loginUser(userData, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(401);
      expect(responseMock.json).toHaveBeenCalledWith({ message: 'Invalid Credentials.' }); 
    });
  })
});
