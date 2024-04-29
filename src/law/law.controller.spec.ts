import { Test, TestingModule } from '@nestjs/testing';
import { LawController } from './law.controller';
import { AppModule } from '../app.module';
import { LawService } from './law.service';
import LawDTO from './dto/law.dto';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import Law from './entity/law.entity';
import { plainToClass } from 'class-transformer';
import LawModificationRequestDTO from './dto/law-modification-request.dto';

describe('LawController', () => {
  let controller: LawController;
  let service: LawService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<LawController>(LawController);
    service = module.get<LawService>(LawService);
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
      metatype: LawDTO,
      data: '',
    };
    let dto: LawDTO = {
      title: 'Hi ana new law',
      field: 'sports',
      upvotes: 0,
      downvotes: 0,
      parliamentMemberName: '',
      modificationRequests: [],
    };
    afterEach(() => {
      dto = {
        title: 'Hi ana new law',
        field: 'sports',
        upvotes: 0,
        downvotes: 0,
        parliamentMemberName: '',
        modificationRequests: [],
      };
    });
    it('should return title should not be empty', async () => {
      dto.title = '';
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'title should not be empty',
        ]);
      });
    });
    it('should return field should not be empty', async () => {
      dto.field = 'Jnoub';
      await target.transform(dto, metadataPC).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'field must be one of the following values: Beirut, Mount Lebanon, Aley, Baabda',
        ]);
      });
    });
  });
  describe('create', () => {
    it('should create a new law', async () => {
      let dto: LawDTO = {
        title: 'Hi ana new law',
        field: 'sports',
        upvotes: 0,
        downvotes: 0,
        parliamentMemberName: '',
        modificationRequests: [],
      };

      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      const requestMock = {
        user: jest.fn().mockReturnThis(),
      } as unknown as any;

      const law = plainToClass(Law, dto);
      jest
        .spyOn(service, 'proposeLaw')
        .mockImplementationOnce(async () => responseMock.status(200).send(law));

      await controller.proposeLaw(dto, responseMock, requestMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(law);
    });
  });
  describe('vote', () => {
    it('should upvote a law', async () => {
      const law = {
        id: 'fad0a077-c6a3-4462-96dd-b6ddbf43cede',
        title: 'NO BHES HAYDA AHSAN',
        field: 'sports',
        upvotes: 0,
        downvotes: 0,
        parliamentMemberName: 'ahmad al maaz',
        createdAt: '2024-04-28T21:23:12.285Z',
        modificationRequests: [
          {
            id: '695d4b29-0315-441c-9025-a6f8b8c54cd3',
            description: 'NO BHES HAYDA AHSAN',
            createdAt: '2024-04-28T21:33:38.737Z',
            userEmail: 'liryexjveei@test.com',
            userName: 'ahmad al maaz',
          },
        ],
      };
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      law.upvotes++;
      jest
        .spyOn(service, 'voteLaw')
        .mockImplementationOnce(async () => responseMock.status(200).send(law));

      await controller.upvoteLaw(
        '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        responseMock,
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(law);
    });
    it('should downvote a law', async () => {
      const law = {
        id: 'fad0a077-c6a3-4462-96dd-b6ddbf43cede',
        title: 'NO BHES HAYDA AHSAN',
        field: 'sports',
        upvotes: 0,
        downvotes: 0,
        parliamentMemberName: 'ahmad al maaz',
        createdAt: '2024-04-28T21:23:12.285Z',
        modificationRequests: [
          {
            id: '695d4b29-0315-441c-9025-a6f8b8c54cd3',
            description: 'NO BHES HAYDA AHSAN',
            createdAt: '2024-04-28T21:33:38.737Z',
            userEmail: 'liryexjveei@test.com',
            userName: 'ahmad al maaz',
          },
        ],
      };
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      law.downvotes++;
      jest
        .spyOn(service, 'voteLaw')
        .mockImplementationOnce(async () => responseMock.status(200).send(law));

      await controller.downvoteLaw(
        '25acda5d-9def-485c-b4ea-f0047c4fe95c',
        responseMock,
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(law);
    });
  });
  describe('modification request', () => {
    it('request new modification for law', async () => {
      const law = 
        {
          id: 'fad0a077-c6a3-4462-96dd-b6ddbf43cede',
          title: 'NO BHES HAYDA AHSAN',
          field: 'sports',
          upvotes: 0,
          downvotes: 0,
          parliamentMemberName: 'ahmad al maaz',
          createdAt: '2024-04-28T21:23:12.285Z',
          modificationRequests: [

          ],
        };
      const modificationRequest : LawModificationRequestDTO={
        description: 'NO BHES HAYDA AHSAN',
      }
      law.modificationRequests.push(modificationRequest)
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;

      const requestMock = {
        user: jest.fn().mockReturnThis(),
      } as unknown as any;

      jest
        .spyOn(service, 'requestModification')
        .mockImplementationOnce(async () =>
          responseMock.status(200).send(law),
        );

      await controller.requestModification('fad0a077-c6a3-4462-96dd-b6ddbf43cede',modificationRequest,responseMock,requestMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(law);
    });
  });
  describe('approve request', () => {
    it('approve modification for law', async () => {
      let law = 
        {
          id: 'fad0a077-c6a3-4462-96dd-b6ddbf43cede',
          title: 'NO BHES HAYDA AHSAN',
          field: 'sports',
          upvotes: 5,
          downvotes: 5,
          parliamentMemberName: 'ahmad al maaz',
          createdAt: '2024-04-28T21:23:12.285Z',
          modificationRequests: [

          ],
        };
      const modificationRequest ={
        id: '695d4b29-0315-441c-9025-a6f8b8c54cd3',
        description: 'NO BHES HAYDA AHSAN',
        createdAt: '2024-04-28T21:33:38.737Z',
        userEmail: 'liryexjveei@test.com',
        userName: 'ahmad al maaz'
      }
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      law={
        ...law,
        upvotes:0,
        downvotes:0,
        title:modificationRequest.description
      }
      jest
      .spyOn(service, 'approveReqModification')
      .mockImplementationOnce(async () =>
        responseMock.status(200).send(law),
      );
      await controller.approveReqModification('fad0a077-c6a3-4462-96dd-b6ddbf43cede',"695d4b29-0315-441c-9025-a6f8b8c54cd3",responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(law);
    });
  });
  describe('findAll', () => {
    it('should return all laws', async () => {
      const laws = [
        {
          id: 'fad0a077-c6a3-4462-96dd-b6ddbf43cede',
          title: 'NO BHES HAYDA AHSAN',
          field: 'sports',
          upvotes: 0,
          downvotes: 0,
          parliamentMemberName: 'ahmad al maaz',
          createdAt: '2024-04-28T21:23:12.285Z',
          modificationRequests: [
            {
              id: '695d4b29-0315-441c-9025-a6f8b8c54cd3',
              description: 'NO BHES HAYDA AHSAN',
              createdAt: '2024-04-28T21:33:38.737Z',
              userEmail: 'liryexjveei@test.com',
              userName: 'ahmad al maaz',
            },
          ],
        },
      ];
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as any;
      jest
        .spyOn(service, 'findAll')
        .mockImplementationOnce(async () =>
          responseMock.status(200).send(laws),
        );

      await controller.findAll(responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.send).toHaveBeenCalledWith(laws);
    });
  });
});
