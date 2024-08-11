export type DynamoTTL = number & { _brand: 'DynamoTTL' }

export namespace DynamoTTL {
  export function of(date: Date): DynamoTTL {
    return Math.floor(date.getTime() / 1000) as DynamoTTL;
  }
}
