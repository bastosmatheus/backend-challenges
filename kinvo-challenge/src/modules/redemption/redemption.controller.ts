import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateRedemptionDto } from "./dto/create-redemption.dto";
import { CreateRedemptionService } from "./services/create-redemption.service";
import { GetAllRedemptionsByCdbService } from "./services/get-all-redemptions-by-cdb.service";
import { GetRedemptionByIdService } from "./services/get-redemption-by-id.service";
import { IsNumberParam } from "src/pipes/is-number-param.pipe";
import { GetAllRedemptionsByCdbDto } from "./dto/get-all-redemptions-by-cdb.dto";
import { GetRedemptionByIdDto } from "./dto/get-redemption-by-id.dto";

@Controller("redemptions")
class RedemptionController {
  constructor(
    private readonly createRedemptionService: CreateRedemptionService,
    private readonly getAllRedemptionsByCdbService: GetAllRedemptionsByCdbService,
    private readonly getRedemptionByIdService: GetRedemptionByIdService
  ) {}

  @Post()
  public async create(@Body() createRedemptionDto: CreateRedemptionDto) {
    try {
      const { amount, cdb_id } = createRedemptionDto;

      const redemption = await this.createRedemptionService.execute({
        amount,
        cdb_id,
      });

      return redemption;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Get("/cdb/:cdb_id")
  public async getAllRedemptionsByCdb(
    @IsNumberParam("cdb_id")
    getAllRedemptionsByCdbDto: GetAllRedemptionsByCdbDto
  ) {
    try {
      const { cdb_id } = getAllRedemptionsByCdbDto;

      const redemption = await this.getAllRedemptionsByCdbService.execute({
        cdb_id,
      });

      return redemption;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Get(":id")
  public async getById(
    @IsNumberParam("id") getRedemptionByIdDto: GetRedemptionByIdDto
  ) {
    try {
      const { id } = getRedemptionByIdDto;

      const redemption = await this.getRedemptionByIdService.execute({
        id,
      });

      return redemption;
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

export { RedemptionController };
