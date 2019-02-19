import { Module, OnModuleInit } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { CategorySchema } from './category.schema';
import { CategoryController } from './category.controller';
import { Model } from 'mongoose';
import { Category } from './category.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule implements OnModuleInit {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}
  async onModuleInit() {
    await this.createCategory();
  }
  private async createCategory() {
    let category = await this.categoryModel.findOne({ name: '舞蹈' });
    if (!category) {
      category = await this.categoryModel.create({ name: '舞蹈' });
      await category.save();

      category = await this.categoryModel.create({ name: '艺术体操' });
      await category.save();

      category = await this.categoryModel.create({ name: '美术' });
      await category.save();
    }
  }
}
