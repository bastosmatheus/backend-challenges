import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateCdbDto } from "./dto/create-cdb.dto";
import { UpdateCdbNameDto } from "./dto/update-cdb-name.dto";
import { CreateCdbService } from "./services/create-cdb.service";
import { GetCdbByIdService } from "./services/get-cbd-by-id.service";
import { UpdateCdbNameService } from "./services/update-cdb-name.service";
import { IsNumberParam } from "src/pipes/is-number-param.pipe";
import { GetCdbByIdDto } from "./dto/get-cdb-by-id.dto";

@Controller("cdbs")
class CdbController {
  constructor(
    private readonly createCdbService: CreateCdbService,
    private readonly getCdbByIdService: GetCdbByIdService,
    private readonly updateCdbNameService: UpdateCdbNameService
  ) {}

  @Get(":id")
  public async getCdbById(@IsNumberParam("id") getCdbByIdDto: GetCdbByIdDto) {
    try {
      const { id } = getCdbByIdDto;

      const cdb = await this.getCdbByIdService.execute({ id });

      return cdb;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Post()
  public async createCdb(@Body() createCdbDto: CreateCdbDto) {
    try {
      const { name, amount_initial, user_id } = createCdbDto;

      const cdb = await this.createCdbService.execute({
        name,
        amount_initial,
        user_id,
      });

      return cdb;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Patch(":id")
  public async updateCdbName(
    @IsNumberParam("id") id: number,
    @Body() updateCdbNameDto: UpdateCdbNameDto
  ) {
    try {
      const { name } = updateCdbNameDto;

      const cdb = await this.updateCdbNameService.execute({ id, name });

      return cdb;
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

export { CdbController };
