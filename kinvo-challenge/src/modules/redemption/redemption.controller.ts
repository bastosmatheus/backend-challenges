import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateRedemptionDto } from "./dto/create-redemption.dto";
import { CreateRedemptionService } from "./services/create-redemption.service";
import { GetAllRedemptionsByCdbService } from "./services/get-all-redemptions-by-cdb.service";
import { GetRedemptionByIdService } from "./services/get-redemption-by-id.service";
import { IsNumberParam } from "src/pipes/is-number-param.pipe";

@Controller("redemptions")
class RedemptionController {
  constructor(
    private readonly createRedemptionService: CreateRedemptionService,
    private readonly getAllRedemptionsByCdbService: GetAllRedemptionsByCdbService,
    private readonly getRedemptionByIdService: GetRedemptionByIdService
  ) {}

  @Post()
  public async create(@Body() createRedemptionDto: CreateRedemptionDto) {
    const { amount, cdb_id } = createRedemptionDto;

    const redemption = await this.createRedemptionService.execute({
      amount,
      cdb_id,
    });

    return redemption;
  }

  @Get("/cdb/:cdb_id")
  public async getAllRedemptionsByCdb(
    @IsNumberParam("cdb_id")
    cdb_id: number
  ) {
    const redemption = await this.getAllRedemptionsByCdbService.execute({
      cdb_id,
    });

    return redemption;
  }

  @Get(":id")
  public async getById(@IsNumberParam("id") id: number) {
    const redemption = await this.getRedemptionByIdService.execute({
      id,
    });

    return redemption;
  }
}

export { RedemptionController };
