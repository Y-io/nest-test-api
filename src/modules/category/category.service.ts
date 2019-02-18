import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, ICategoryInput } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}
  // name, parentId, description
  // 创建分类
  async createCategory(categoryInput: ICategoryInput): Promise<Category> {
    const { name, parent } = categoryInput;

    let parentCategory: Category;
    if (parent) {
      parentCategory = await this.categoryModel.findOne({
        _id: parent,
      });
      if (!parentCategory) throw new HttpException('该父级分类不存在', 404);

      categoryInput.paths = [...parentCategory.paths, parent];
    }

    let category: Category = <Category>(
      await this.categoryModel.findOne({ name })
    );
    if (category) throw new HttpException('分类名已存在', 406);

    category = new this.categoryModel(categoryInput);
    await category.save();

    if (parent)
      await this.categoryModel.updateOne(
        { _id: parentCategory._id },
        { $addToSet: { children: category._id } },
      );
    return category;
  }

  // 查询所有分类
  async findCategory(): Promise<Category[]> {
    const category = <Category[]>await this.categoryModel
      .find({ parent: null })
      .populate(['parent'])
      .exec();
    return category;
  }

  // 查询指定id的分类
  async findCategoryById(id): Promise<Category> {
    const category = <Category>await this.categoryModel
      .findOne({ _id: id })
      .populate(['parent'])
      .exec();
    return category;
  }
}
