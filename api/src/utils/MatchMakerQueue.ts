class MatchMakerQueue<T> {
  private data: T[] = [];

  subscribe(item: T) {
    this.data.push(item);
  }

  cancel(item: T) {
    this.data = this.data.filter((value) => value === item);
  }

  pairing(): T[] | undefined {
    const ret: T[] = [];

    if (this.data.length > 1) {
      ret[0] = this.data.shift();
      ret[1] = this.data.shift();
      return ret;
    }
    return undefined;
  }
}

export { MatchMakerQueue };
