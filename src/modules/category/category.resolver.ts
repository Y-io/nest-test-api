import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';

import { Category } from './category.interface';
import { Roles } from 'src/core';
import { RoleEnum } from '../base.object';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation()
  @Roles(RoleEnum.SuperAdmin)
  async createCategory(
    @Args('name') name: string,
    @Args('parentId') parentId: string,
    @Args('description') description: string,
  ): Promise<Category> {
    const data = await this.categoryService.createCategory({
      name,
      parent: parentId,
      description,
    });
    return data;
  }

  @Query()
  async findCategory(): Promise<Category[]> {
    return <Category[]>await this.categoryService.findCategory();
  }

  @Query()
  async findCategoryById(@Args('id') id: string): Promise<Category> {
    return await this.categoryService.findCategoryById(id);
  }
}
