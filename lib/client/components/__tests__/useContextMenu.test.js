import React from 'react';
import useContextMenu from '../useContextMenu';

import { act } from 'react-dom/test-utils';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

const HookWrapper = (props) => {
  const hook = props.hook ? props.hook() : undefined;
  return <div className="test-custom-hook" hook={hook} />;
};

describe('useContextMenu custom Hook', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders corretcly', () => {
    const wrapper = shallow(<HookWrapper hook={() => useContextMenu()} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('sets and removes EventListeners correctly', () => {
    const trigger = {};
    document.addEventListener = jest.fn((event, cb) => {
      trigger[event] = cb;
    });

    document.removeEventListener = jest.fn((event) => {
      trigger[event] = undefined;
    });

    const wrapper = mount(<HookWrapper hook={() => useContextMenu()} />);

    expect(document.addEventListener).toBeCalledWith(
      'contextmenu',
      expect.any(Function)
    );
    expect(document.addEventListener).toBeCalledWith(
      'click',
      expect.any(Function)
    );
    expect(document.addEventListener).toBeCalledTimes(2);

    wrapper.unmount();
    expect(document.removeEventListener).toBeCalledWith(
      'contextmenu',
      expect.any(Function)
    );
    expect(document.removeEventListener).toBeCalledWith(
      'click',
      expect.any(Function)
    );
    expect(document.removeEventListener).toBeCalledTimes(2);
  });

  it('returns correct states initial values', () => {
    const wrapper = shallow(<HookWrapper hook={() => useContextMenu()} />);

    const { hook } = wrapper.find('div').props();
    const { xPos, yPos, showMenu, handleClick, testValue } = hook;
    expect(xPos).toEqual('0px');
    expect(yPos).toEqual('0px');
    expect(testValue).toEqual('');
    expect(showMenu).toBe(false);
    expect(handleClick).toBeDefined();
  });

  it('updates state correctcly on contextmenu and click', () => {
    const trigger = {};
    document.addEventListener = jest.fn((event, cb) => {
      trigger[event] = cb;
    });

    window.alert = jest.fn(() => {});

    const wrapper = mount(<HookWrapper hook={() => useContextMenu()} />);

    let { hook } = wrapper.find('div').props();
    let { xPos, yPos, showMenu, testValue } = hook;
    expect(xPos).toEqual('0px');
    expect(yPos).toEqual('0px');
    expect(testValue).toEqual('');
    expect(showMenu).toBe(false);

    act(() => {
      trigger.contextmenu({
        target: { nodeName: 'TD' },
        pageX: 1,
        pageY: 2,
        preventDefault: jest.fn(() => {}),
        path: [{ a: 'a' }, { cells: [{ innerText: 'ok' }] }],
      });
    });

    wrapper.update();

    ({ hook } = wrapper.find('div').props());
    ({ xPos, yPos, showMenu, testValue } = hook);
    expect(xPos).toEqual('1px');
    expect(yPos).toEqual('2px');
    expect(showMenu).toBe(true);
    expect(testValue).toBe('ok');

    act(() => {
      trigger.click({ currentTarget: { id: 'test' } });
    });

    wrapper.update();

    ({ hook } = wrapper.find('div').props());
    ({ xPos, yPos, showMenu, testValue } = hook);
    expect(showMenu).toBe(false);
    expect(testValue).toBe('ok');
    expect(window.alert).toHaveBeenCalledWith(`Entity id ${testValue}`);
  });

  it('does not displays Entity id if click outside test contextmenu buton', () => {
    const trigger = {};
    document.addEventListener = jest.fn((event, cb) => {
      trigger[event] = cb;
    });

    window.alert = jest.fn(() => {});

    mount(<HookWrapper hook={() => useContextMenu()} />);

    act(() => {
      trigger.click({ currentTarget: { id: '' } });
    });

    expect(window.alert).toBeCalledTimes(0);
  });

  it('does not displays contextmenu if click outside a table', () => {
    const trigger = {};
    document.addEventListener = jest.fn((event, cb) => {
      trigger[event] = cb;
    });

    const wrapper = mount(<HookWrapper hook={() => useContextMenu()} />);

    act(() => {
      trigger.contextmenu({
        target: { nodeName: 'TH' },
        pageX: 10,
        pageY: 20,
        preventDefault: jest.fn(() => {}),
        path: [{ a: 'a' }, { cells: [{ innerText: 'shown' }] }],
      });
    });

    wrapper.update();

    const { hook } = wrapper.find('div').props();
    const { xPos, yPos, showMenu, testValue } = hook;
    expect(xPos).not.toEqual('10px');
    expect(yPos).not.toEqual('20px');
    expect(testValue).not.toEqual('shown');
    expect(showMenu).toBe(false);
  });
});
