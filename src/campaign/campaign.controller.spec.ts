import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from './campaign.controller';
import { AppModule } from '../app.module';
import { CampaignService } from './campaign.service';
import CampaignDTO from './dto/campaign.dto';
import { ValidationPipe, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import Campaign from './entity/campaign.entity';

describe('CampaignController', () => {
  let controller: CampaignController;
  let service: CampaignService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
    service = module.get<CampaignService>(CampaignService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('DTO validation', () => {
    let target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadataPC: ArgumentMetadata = {
      type: 'body',
      metatype: CampaignDTO,
      data: '',
    };
    let dto: CampaignDTO = {
      goals: ['WIN ENTEKHEBAT'],
      candidateNames: ['ahmad', 'asal', 'hmede', 'mershad'],
      district: 'Beirut',
      politicalDependecy: 'ssss',
      year: 2025,
      description: 'sss',
      upvotes: 0,
      downvotes: 0,
      campaignOutcome: 0,
      isPoliticalArchive: false,
    };
    afterEach(() => {
      dto = {
        goals: ['WIN ENTEKHEBAT'],
        candidateNames: ['ahmad', 'asal', 'hmede', 'mershad'],
        district: 'Beirut',
        politicalDependecy: 'ssss',
        year: 2025,
        description: 'sss',
        upvotes: 0,
        downvotes: 0,
        campaignOutcome: 0,
        isPoliticalArchive: false,
      };
    });
    it('should return description should not be empty', async () => {
      dto.description = '';
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'description should not be empty',
        ]);
      });
    });
    it('should return district should not in restricted values', async () => {
      dto.district = 'Jnoub';
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'district must be one of the following values: Beirut, Mount Lebanon, Aley, Baabda',
        ]);
      });
    });
    it('should return politicalDependecy should not be empty', async () => {
      dto.politicalDependecy = '';
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'politicalDependecy should not be empty',
        ]);
      });
    });
    it('should return year should must not be less than 2024', async () => {
      dto.year = 2022;
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'year must not be less than 2024',
        ]);
      });
    });
    it('should return candidateNames must contain at least 1 element', async () => {
      dto.candidateNames = [];
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'candidateNames must contain at least 1 elements',
        ]);
      });
    });
    it('should return goals must contain at least 1 element', async () => {
      dto.goals = [];
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'goals must contain at least 1 elements',
        ]);
      });
    });
  });
  describe('create', () => {
    it('should create a new campaign', async () => {
      const dto: CampaignDTO = {
        goals: ['WIN ENTEKHEBAT'],
        candidateNames: ['ahmad', 'asal', 'hmede', 'mershad'],
        district: 'Beirut',
        politicalDependecy: 'ssss',
        year: 2025,
        description: 'sss',
        upvotes: 0,
        downvotes: 0,
        campaignOutcome: 0,
        isPoliticalArchive: false,
      };

      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;

      const campaign = plainToClass(Campaign, dto);
      jest
        .spyOn(service, 'createCampaign')
        .mockImplementationOnce(async () =>
          responseMock.status(200).send(campaign),
        );

      await controller.createCampaign(dto, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(campaign);
    });
  });
  describe('vote', () => {
    it('should upvote a campaign', async () => {
      const campaign = {
        id: '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        goals: ['hi'],
        candidateNames: ['hi'],
        district: 'hi',
        politicalDependecy: 'hi',
        year: 2000,
        description: 'dsadasd',
        upvotes: 1,
        downvotes: 4,
        campaignOutcome: 0,
        isPoliticalArchive: false,
        createdAt: '2024-04-28T14:26:45.913Z',
      };
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      campaign.upvotes++;
      jest
        .spyOn(service, 'voteCampaign')
        .mockImplementationOnce(async () =>
          responseMock.status(200).send(campaign),
        );

      await controller.upvoteCampaign(
        '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        responseMock,
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(campaign);
    });
    it('should downvote a campaign', async () => {
      const campaign = {
        id: '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        goals: ['hi'],
        candidateNames: ['hi'],
        district: 'hi',
        politicalDependecy: 'hi',
        year: 2000,
        description: 'dsadasd',
        upvotes: 1,
        downvotes: 4,
        campaignOutcome: 0,
        isPoliticalArchive: false,
        createdAt: '2024-04-28T14:26:45.913Z',
      };
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      campaign.downvotes++;
      jest
        .spyOn(service, 'voteCampaign')
        .mockImplementationOnce(async () =>
          responseMock.status(200).send(campaign),
        );

      await controller.downvoteCampaign(
        '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        responseMock,
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(campaign);
    });
  });
  describe('archive', () => {
    it('should archive a campaign', async () => {
      const campaign = {
        id: '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        goals: ['hi'],
        candidateNames: ['hi'],
        district: 'hi',
        politicalDependecy: 'hi',
        year: 2000,
        description: 'dsadasd',
        upvotes: 1,
        downvotes: 4,
        campaignOutcome: 0,
        isPoliticalArchive: false,
        createdAt: '2024-04-28T14:26:45.913Z',
      };
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      campaign.isPoliticalArchive = true;
      jest
        .spyOn(service, 'archiveCampaign')
        .mockImplementationOnce(async () =>
          responseMock.status(200).send(campaign),
        );

      await controller.archiveCampaign(
        '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        responseMock,
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(campaign);
    });
  });
  describe('findAll', () => {
    it('should return all campaigns', async () => {
      const campaigns = [{
        id: '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        goals: ['hi'],
        candidateNames: ['hi'],
        district: 'hi',
        politicalDependecy: 'hi',
        year: 2000,
        description: 'dsadasd',
        upvotes: 1,
        downvotes: 4,
        campaignOutcome: 0,
        isPoliticalArchive: false,
        createdAt: '2024-04-28T14:26:45.913Z',
      }]
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      jest
        .spyOn(service, 'findAll')
        .mockImplementationOnce(async () =>
          responseMock.status(200).send(campaigns),
      );

      await controller.findAll(
        responseMock,
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(campaigns);
    });
  });
});
