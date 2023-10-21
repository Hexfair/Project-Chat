import { IsNumber } from 'class-validator';
//===========================================================================================================

export class GetMoreMessagesDto {
	@IsNumber()
	roomId: number;

	@IsNumber()
	page: number;
}
