import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface FormExampleArgs {}

export default class FormExample extends Component<FormExampleArgs> {
  @tracked isSmall = false;
  @tracked isLarge = false;
  @tracked isInline = false;

  @tracked firstName!: string;
  @tracked email!: string;
  @tracked accountType!: string;
  @tracked bio!: string;
  @tracked interests: string[] = [];

  get firstNameErrors(): string[] {
    if (this.firstName) {
      return [];
    } else {
      return ["First name can't be blank"];
    }
  }

  get emailErrors(): string[] {
    if (this.email && this.email.includes('@')) {
      return [];
    } else {
      return ['Email must be a valid email address'];
    }
  }

  get accountTypeErrors(): string[] {
    if (this.accountType === 'other') {
      return ['Other is not a real option, please select something else'];
    }
    return [];
  }

  get interestsErrors(): string[] {
    if (this.interests.length == 0) {
      return ['At least one option must be selected'];
    } else {
      return [];
    }
  }

  get isIoTChecked(): boolean {
    return this.interests.includes('IoT');
  }

  get isMusicChecked(): boolean {
    return this.interests.includes('Music');
  }

  get isEntertainmentTChecked(): boolean {
    return this.interests.includes('Entertainment');
  }

  @action setField(
    fieldName:
      | 'firstName'
      | 'email'
      | 'accountType'
      | 'isLarge'
      | 'isSmall'
      | 'isInline',
    value: string | boolean
  ) {
    this[fieldName] = value as never;
  }

  @action setInterest(interest: string, isChecked: boolean) {
    if (isChecked) {
      this.interests = [...this.interests, interest];
    } else {
      this.interests = this.interests.filter(element => {
        return element !== interest;
      });
    }
  }
}