// BEGIN-SNIPPET demo-overlays-drawer.ts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class DemoDrawer extends Component {
  @tracked isOpen = false;
  @tracked isLoading = false;
  @tracked placement = 'right';
  @tracked size = 'md';

  @action toggleIsOpen(): void {
    this.isOpen = !this.isOpen;
  }

  @action setPlacement(placement: string): void {
    this.placement = placement;
  }

  @action setSize(size: string): void {
    this.size = size;
  }

  @action save(): void {
    this.isLoading = true;

    later(
      this,
      () => {
        this.isLoading = false;
        this.isOpen = false;
      },
      1000
    );
  }
}
// END-SNIPPET
