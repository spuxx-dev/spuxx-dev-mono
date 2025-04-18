export interface ChangesetOptions {
  validate?: () => void | false | Promise<void | false>;
}

export class Changeset<TRef extends object> {
  /**
   * The reference to the object that the changeset is associated with.
   */
  public readonly ref: TRef;
  /**
   * The set of unsaved changes.
   */
  public readonly changes: Partial<TRef> = {};
  validate: undefined | (() => void | false | Promise<void | false>) = undefined;

  constructor(ref: TRef, options?: ChangesetOptions) {
    this.ref = ref;
    if (options?.validate) this.validate = options.validate;
  }

  /**
   * Returns a version of the original reference representing its current state, including
   * unsaved changes.
   */
  get current() {
    return { ...this.ref, ...this.changes };
  }

  /**
   * Updates a property on the changeset.
   * @param key The key of the property to set.
   * @param value The new value of the property.
   */
  set<TKey extends keyof TRef>(key: TKey, value: TRef[TKey]) {
    if (value === this.ref[key]) {
      delete this.changes[key];
    } else {
      this.changes[key] = value;
    }
  }

  /**
   * Returns the current value of the given property key.
   */
  get<TKey extends keyof TRef>(key: TKey) {
    return { ...this.ref, ...this.changes }[key];
  }

  /**
   * Returns the original value of the given property key.
   */
  getOriginal<TKey extends keyof TRef>(key: TKey) {
    return this.ref[key];
  }

  /**
   * Whether the changeset's state currently matches the reference value.
   */
  get isClean() {
    return Object.keys(this.changes).length === 0;
  }

  /**
   * Whether the changeset's state currently differs from the reference value.
   */
  get isDirty() {
    return Object.keys(this.changes).length > 0;
  }

  /*
   * Rolls back all unsaved changes.
   */
  rollback() {
    for (const key in this.changes) {
      delete this.changes[key as keyof typeof this.changes];
    }
  }

  /**
   * Writes all unsaved changes to the original reference. Will call `validate` before saving
   * if it has been defined.
   */
  async save() {
    if (this.validate) {
      const validationResult = await this.validate();
      if (validationResult === false) return;
    }

    for (const key in this.changes) {
      if (this.changes[key] === undefined) continue;
      this.ref[key] = this.changes[key];
      delete this.changes[key];
    }
  }
}
