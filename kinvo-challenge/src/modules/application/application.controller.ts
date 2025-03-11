import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { CreateApplicationService } from "./services/create-application.service";
import { GetAllApplicationsByCdbService } from "./services/get-all-applications-by-cdb.service";
import { GetApplicationByIdService } from "./services/get-application-by-id.service";
import { IsNumberParam } from "src/pipes/is-number-param.pipe";
import { GetApplicationByIdDto } from "./dto/get-application-by-id.dto";
import { GetAllApplicationsByCdbDto } from "./dto/get-all-applications-by-cdb.dto";

@Controller("applications")
class ApplicationController {
  constructor(
    private readonly createApplicationService: CreateApplicationService,
    private readonly getAllApplicationsByCdbService: GetAllApplicationsByCdbService,
    private readonly getApplicationByIdService: GetApplicationByIdService
  ) {}

  @Get("/cdb/:cdb_id")
  public async getAllApplicationsByCdb(
    @IsNumberParam("cdb_id")
    getAllApplicationsByCdbDto: GetAllApplicationsByCdbDto
  ) {
    try {
      const { cdb_id } = getAllApplicationsByCdbDto;

      const application = await this.getAllApplicationsByCdbService.execute({
        cdb_id,
      });

      return application;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Get(":id")
  public async getById(
    @IsNumberParam("id") getApplicationByIdDto: GetApplicationByIdDto
  ) {
    try {
      const { id } = getApplicationByIdDto;

      const application = await this.getApplicationByIdService.execute({
        id,
      });

      return application;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Post()
  public async create(@Body() createApplicationDto: CreateApplicationDto) {
    try {
      const { amount, cdb_id } = createApplicationDto;

      const application = await this.createApplicationService.execute({
        amount,
        cdb_id,
      });

      return application;
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

export { ApplicationController };
