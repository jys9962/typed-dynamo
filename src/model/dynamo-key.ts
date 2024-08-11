import { FormatObject } from '../interface/dynamo-entity.interface';

export type DynamoKey<T> = string & { _key: T }

export namespace DynamoKey {
  const isTemplate = (t: string) => t.startsWith('{') && t.endsWith('}');
  const parseTemplate = (t: string) => t.slice(1, t.length - 1);

  export function create<TFormat extends string>(
    format: TFormat,
    value: FormatObject<TFormat>,
  ): DynamoKey<TFormat> {
    return format
      .split('#')
      .map(
        (t) => isTemplate(t)
          ? value[parseTemplate(t) as keyof typeof value]
          : t,
      )
      .join('#') as DynamoKey<TFormat>;
  }

  export function parse<TFormat extends string>(
    format: TFormat,
    value: DynamoKey<TFormat>,
  ): FormatObject<TFormat> {
    const valueArray = value.split('#');

    return format
      .split('#')
      .reduce(
        (
          acc,
          t,
          i,
        ) => {
          if (!isTemplate(t)) {
            return acc;
          }

          const key = parseTemplate(t);
          acc[key] = valueArray[i];
          return acc;
        },
        {} as any,
      );
  }


}
