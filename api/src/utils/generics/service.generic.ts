import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DeepPartial, ObjectID, FindConditions, UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { PagedResponse } from './paged-response.generic';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class GenericService<T, CreateInput, UpdateInput> {
  private model: Repository<T>;
  constructor(model: Repository<T>) {
    this.model = model;
  }

  // private paginateResponse(
  //   currentPage: number,
  //   perPage: number,
  //   count: number,
  //   data: T[],
  // ): PagedResponse<T> {
  //   return new PagedResponse(count, currentPage, perPage, data);
  // }

  protected async fetchAll(
    currentPage: any = '1',
    perPage: any = '10',
    where: any = null,
    pagination = true,
  ): Promise<PagedResponse<T>> {
    currentPage = Number(currentPage);
    perPage = Number(perPage);

    if(pagination) {
      const [result, total] = await this.model.findAndCount({
        where,
        take: perPage,
        skip: currentPage === 1 ? 0 : currentPage * perPage,
      });
      return new PagedResponse(total, currentPage, perPage, result);
    }
  }

  protected async fetchBy(fetchField: FindManyOptions<T>): Promise<T[]> {
    try {
      const fetch = await this.model.find(fetchField);
      if (fetch) {
        return fetch;
      } else {
        throw new NotFoundException(
          `The resource ${Object.values(fetchField)} not found.`,
          'Not found.',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async create(data: QueryDeepPartialEntity<T>): Promise<InsertResult> {
    try {
      return await this.model.insert(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async update(field: string | number | string[] | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>, updatedData: UpdateInput): Promise<UpdateResult> {
    try {
      return await this.model.update(field, updatedData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async delete(field: string | number | string[] | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>): Promise<DeleteResult> {
    try {
      return await this.model.delete(field);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
