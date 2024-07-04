import { useFormContext } from 'react-hook-form';

export default function PersonalInfoPreview() {
    const {watch} = useFormContext()
    return (
        <div>
            <h1>{watch('name')}</h1>
        </div>
    );
}