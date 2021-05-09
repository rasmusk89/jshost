import { useState } from "react";

interface IFormValues {
    input: string;
    checkbox: boolean;
    radio: string;
    textarea: string;
    select: string;
}

export interface IFormProps {
    values: IFormValues;
    handleChange: (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => void;
}

const FormView = (props: IFormProps) => {
    return (
        <form>
            <hr />
            <div className="form-group">
                <label htmlFor="formInputText">Text</label>
                <input value={props.values.input} onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="formInputText" />
            </div>
            <hr />

            <div className="form-group form-check">
                <input checked={props.values.checkbox} onChange={(e) => props.handleChange(e.target)} type="checkbox" className="form-check-input" id="formInputCheckbox" />
                <label className="form-check-label" htmlFor="formInputCheckbox">Checkbox</label>
            </div>
            <hr />

            <div className="form-check">
                <input checked={props.values.radio === 'checked1'} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="formInputRadio1" value="checked1" />
                <label className="form-check-label" htmlFor="formInputRadio1">
                    Radio 1
                </label>
            </div>
            <div className="form-check">
                <input checked={props.values.radio === 'checked2'} onChange={(e) => props.handleChange(e.target)} className="form-check-input" type="radio" id="formInputRadio2" value="checked2" />
                <label className="form-check-label" htmlFor="formInputRadio2">
                    Radio 2
                </label>
            </div>
            <hr />

            <div className="mb-3">
                <label htmlFor="formIputTextarea" className="form-label">Textarea</label>
                <textarea value={props.values.textarea} onChange={(e) => props.handleChange(e.target)} className="form-control" id="formIputTextarea" rows={3}></textarea>
            </div>
            <hr />

            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="formInputSelectList">Selectlist</label>
                <select value={props.values.select} onChange={(e) => props.handleChange(e.target)} className="form-select" id="formInputSelectList">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

const initialFormValues: IFormValues = {
    input: '',
    checkbox: false,
    radio: '',
    textarea: '',
    select: '',
}



const PageForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {

        if (target.id === 'formInputText') {
            setFormValues({ ...formValues, input: target.value });
            return;
        }

        if (target.id === 'formInputCheckbox') {
            setFormValues({ ...formValues, checkbox: (target as HTMLInputElement).checked });
            return;
        }

        if (target.id === 'formInputRadio1') {
            setFormValues({ ...formValues, radio: (target as HTMLInputElement).value });
            return;
        }

        if (target.id === 'formInputRadio2') {
            setFormValues({ ...formValues, radio: (target as HTMLInputElement).value });
            return;
        }

        if (target.id === 'formIputTextarea') {
            setFormValues({ ...formValues, textarea: target.value });
            return;
        }

        if (target.id === 'formInputSelectList') {
            setFormValues({ ...formValues, select: target.value });
            return;
        }

    }

    return <FormView values={formValues} handleChange={handleChange} />
}

export default PageForm;
