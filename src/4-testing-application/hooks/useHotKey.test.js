import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import useHotKey from './useHotKey'
import { useModal } from "../components/Modal";
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';


/**
 * 👉 TASK: Testing hooks
 *
 * Let's practice in testing react hooks! This hook runs a callback
 * when a specific key is pressed.
 */
const callbackFn = jest.fn()

function TestComponent() {
    const newMusingModal = useModal();
    useHotKey("n", callbackFn);

    return (
        <div>
            <input data-testid="input"></input>
            <textarea data-testid="textarea"></textarea>
            <select data-testid="select"></select>
        </div>
    )
}

let container = null;

beforeEach(() => {
    // set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});



test("runs callback when key is pressed", () => {
    act(() => {
        render(<TestComponent />, container);
    })

    userEvent.keyboard('n');
    expect(callbackFn).toBeCalledTimes(1);
})

test("ignores keys pressed within input elements", () => {
    act(() => {
        render(<TestComponent />, container);
    })

    //Within input
    const input = screen.getByTestId('input');
    userEvent.click(input);
    userEvent.keyboard('n');
    expect(callbackFn).not.toBeCalled()

    //Within textarea
    const textarea = screen.getByTestId('textarea');
    userEvent.click(textarea);
    userEvent.keyboard('n');
    expect(callbackFn).not.toBeCalled();

    //Within select
    const select = screen.getByTestId('textarea');
    userEvent.click(select);
    userEvent.keyboard('n');
    expect(callbackFn).not.toBeCalled();
})
