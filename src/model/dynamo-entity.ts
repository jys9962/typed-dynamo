import { DynamoItem, EntityType, FormatObject, KeyParam } from '../interface/dynamo-entity.interface';
import { DynamoKey } from './dynamo-key';

export class DynamoEntity<
  TKey extends Record<string, string>,
  TProps extends DynamoItem
> {
  constructor(
    private readonly keyTemplate: TKey,
  ) {}

  create(
    value: KeyParam<TKey> & TProps,
  ): EntityType<this> {
    return Object
      .keys(this.keyTemplate)
      .reduce(
        (
          acc,
          key,
        ) => {
          acc[key] = DynamoKey.create(this.keyTemplate[key], value[key]);
          return acc;
        },
        { ...value } as any,
      );
  }

  key<Key extends keyof TKey>(
    key: Key,
    value: FormatObject<TKey[Key]>,
  ): DynamoKey<TKey[Key]> {
    return DynamoKey.create(this.keyTemplate[key], value);
  }

  parse(
    value: EntityType<this>,
  ): KeyParam<TKey> & TProps {
    return Object
      .keys(this.keyTemplate)
      .reduce(
        (
          acc,
          key,
        ) => {
          acc[key] = DynamoKey.parse(this.keyTemplate[key], value[key] as any);
          return acc;
        },
        { ...value } as any,
      );

  }
}
