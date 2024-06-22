import { Test, TestingModule } from '@nestjs/testing';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { Survey } from './survey.entity';

describe('SurveysController', () => {
  let controller: SurveysController;
  let service: SurveysService;

  const mockSurvey: Survey = {
    id: '1', // Replace with your test IDs or generate dynamically
    name: 'Mock Survey',
    questions: [],
    answers: [],
    vigenciaDesde: new Date(),
    vigenciaHasta: new Date(),
    isEnabled: true,
    isDefault: false,
    created: new Date(),
    createdBy: 'test_user',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveysController],
      providers: [
        {
          provide: SurveysService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockSurvey]),
            create: jest.fn().mockResolvedValue(mockSurvey),
            findOne: jest.fn().mockResolvedValue(mockSurvey),
            update: jest.fn().mockResolvedValue(mockSurvey),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<SurveysController>(SurveysController);
    service = module.get<SurveysService>(SurveysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all surveys', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockSurvey]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a survey', async () => {
    const result = await controller.create(mockSurvey);
    expect(result).toEqual(mockSurvey);
    expect(service.create).toHaveBeenCalledWith(mockSurvey);
  });

  it('should get a survey by id', async () => {
    const result = await controller.findOne(mockSurvey.id);
    expect(result).toEqual(mockSurvey);
    expect(service.findOne).toHaveBeenCalledWith(mockSurvey.id);
  });

  it('should update a survey', async () => {
    const result = await controller.update(mockSurvey.id, mockSurvey);
    expect(result).toEqual(mockSurvey);
    expect(service.update).toHaveBeenCalledWith(mockSurvey.id, mockSurvey);
  });

  it('should delete a survey', async () => {
    const result = await controller.delete(mockSurvey.id);
    expect(result).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith(mockSurvey.id);
  });
});
