import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import 'qunit-dom';

module('Integration | Component | InputCheckbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with the label from argument', async function(assert) {
    await render(
      hbs`<InputCheckbox
            data-test-input
            @label="My Checkbox Input"
          />`
    );
    assert.dom('[data-test-input] + label').hasText('My Checkbox Input');
  });

  test('it renders the label from block param', async function(assert) {
    await render(
      hbs`<InputCheckbox data-test-input>My Block Label</InputCheckbox>`
    );

    assert.dom('[data-test-input] + label').hasText('My Block Label');
  });

  test('it should have id attr with matching label attr `for`', async function(assert) {
    await render(hbs`<InputCheckbox
                      @label="Something Else"
                      data-test-input
                    />`);

    const el = find('[data-test-input]') as HTMLInputElement;
    const id = el.getAttribute('id') || '';

    assert.ok(/ember[1-9.]/.test(id), 'should have generated an id');

    assert.dom('[data-test-id="form-field-label"]').hasAttribute('for', id);
  });

  test('it renders the `name` from args', async function(assert) {
    await render(
      hbs`<InputCheckbox
            data-test-input
            @name="my-input"
          />`
    );

    assert.dom('[data-test-input]').hasAttribute('name', 'my-input');
  });

  test('it does not mutates the value directly', async function(assert) {
    this.set('myValue', undefined);

    await render(
      hbs`<InputCheckbox
            data-test-input
            name="my-input"
            @label="My Checkbox Input"
            @checked={{this.myValue}}
          />`
    );

    await click('[data-test-input] + label');
    assert.equal(this.get('myValue'), undefined);
  });

  test('it calls onChange function to change value', async function(assert) {
    this.set('myValue', undefined);

    await render(
      hbs`<InputCheckbox
            data-test-input
            name="my-input"
            @label="My Checkbox Input"
            @checked={{this.myValue}}
            @onChange={{action (mut this.myValue)}}
          />`
    );

    await click('[data-test-input] + label');
    assert.equal(this.get('myValue'), true);
  });

  test('it marks the input as checked if value matches', async function(assert) {
    this.set('myValue', false);

    await render(
      hbs`<InputCheckbox
            data-test-input
            @label="My Checkbox Input"
            @checked={{this.myValue}}
          />`
    );

    assert.dom('[data-test-input]').isNotChecked();
    this.set('myValue', true);

    assert.dom('[data-test-input]').isChecked();
  });

  test('input id should match label for attribute', async function(assert) {
    this.set('myValue', false);

    await render(
      hbs`<InputCheckbox
            data-test-input
            @label="My Checkbox Input"
          />`
    );

    const inputId = find('[data-test-input]')!.getAttribute('id');
    const labelFor = find('[data-test-input] + label')!.getAttribute('for');

    assert.ok(inputId, 'input should have an id attribute');
    assert.equal(
      inputId,
      labelFor,
      'id attribute of input should be equal to for attribute of label'
    );
  });

  test('it adds has-margin class if @hasMargin is true', async function(assert) {
    this.set('hasMargin', undefined);

    await render(
      hbs`<InputCheckbox
            data-test-input
            @hasMargin={{this.hasMargin}}
          />`
    );

    assert.dom('.input-checkbox').doesNotHaveClass('has-margin');
    this.set('hasMargin', true);
    assert.dom('.input-checkbox').hasClass('has-margin');
  });
});
