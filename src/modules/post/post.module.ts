import { Module, Logger, Inject } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
