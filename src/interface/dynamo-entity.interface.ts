import { DynamoKey } from '../model/dynamo-key';
import { DynamoEntity } from '../model/dynamo-entity';

export type SplitFormat<TFormat extends string> =
  TFormat extends `${infer K}#${infer X}`
    ? SplitFormat<K> | SplitFormat<X>
    : TFormat

type OnlyBrace<T extends string> =
  T extends `{${infer K}}`
    ? K
    : never

export type FormatKeys<T extends string> =
  OnlyBrace<SplitFormat<T>>

export type FormatObject<T extends string> =
  Record<FormatKeys<T>, string>

export type KeyParam<T extends Record<string, string>> = {
  [Key in keyof T]: FormatObject<T[Key]>
}

export type DynamoColumns = string | number | boolean
export type DynamoArrayColumns = DynamoColumns[]
export type DynamoItem = {
  [Key in string]: DynamoColumns | DynamoArrayColumns | Record<string, DynamoColumns | DynamoArrayColumns | DynamoItem>
}

export type ParseKey<T extends Record<string, string>> = {
  [Key in keyof T]: DynamoKey<T[Key]>
};

export type EntityType<T extends DynamoEntity<any, any>> =
  T extends DynamoEntity<infer TKey, infer TProp>
    ? ParseKey<TKey> & TProp
    : never
