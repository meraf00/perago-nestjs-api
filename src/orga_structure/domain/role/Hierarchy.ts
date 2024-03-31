export interface Hierarchy {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly subordinates: Hierarchy[];
}
