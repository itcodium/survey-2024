import { Test, TestingModule } from '@nestjs/testing';
import { SurveysService } from './surveys.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

describe('SurveysService', () => {
  let service: SurveysService;
  let repo: Repository<Survey>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveysService,
        {
          provide: getRepositoryToken(Survey),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SurveysService>(SurveysService);
    repo = module.get<Repository<Survey>>(getRepositoryToken(Survey));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a survey', async () => {
    const survey = new Survey();
    survey.name = 'Test Survey';

    jest.spyOn(repo, 'save').mockResolvedValue(survey);
    expect(await service.create(survey)).toEqual(survey);
  });

  it('should find all surveys', async () => {
    const survey = new Survey();
    survey.name = 'Test Survey';

    jest.spyOn(repo, 'find').mockResolvedValue([survey]);
    expect(await service.findAll()).toEqual([survey]);
  });

  it('should find one survey by id', async () => {
    const survey = new Survey();
    survey.name = 'Test Survey';

    const objectId = new ObjectId();
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(survey);
    expect(await service.findOne(objectId.toHexString())).toEqual(survey);
  });

  it('should update a survey', async () => {
    const survey = new Survey();
    survey.name = 'Test Survey';

    const objectId = new ObjectId();
    const updateResult = { affected: 1 } as any;

    jest.spyOn(repo, 'update').mockResolvedValue(updateResult);
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(survey);

    expect(await service.update(objectId.toHexString(), survey)).toEqual(survey);
  });

  it('should delete a survey', async () => {
    const objectId = new ObjectId();
    const deleteResult = { affected: 1 } as any;

    jest.spyOn(repo, 'delete').mockResolvedValue(deleteResult);
    expect(await service.delete(objectId.toHexString())).toBeUndefined();
  });
});
