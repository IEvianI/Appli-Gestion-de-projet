import Logo from '@/Assets/logo-task-flow.svg'

export default function ApplicationLogo(props) {
    return (
        <img
        {...props}
         src={Logo} alt="Logo modifié" />
    );
}
