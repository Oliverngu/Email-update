import React, { useState } from 'react';
import { User, Unit, RolePermissions } from '../../../core/models/data';
import FelhasznalokApp from './FelhasznalokApp';
import MeghivokApp from './MeghivokApp';
import EgysegekApp from './EgysegekApp';
import PoziciokApp from './PoziciokApp';
import JogosultsagokApp from './JogosultsagokApp';
import NotificationSettings from './NotificationSettings';

import UsersIcon from '../icons/UsersIcon';
import InvitationIcon from '../icons/InvitationIcon';
import BuildingIcon from '../icons/BuildingIcon';
import BriefcaseIcon from '../icons/BriefcaseIcon';
import ShieldIcon from '../icons/ShieldIcon';
import BellIcon from '../icons/BellIcon';

interface AdminisztracioAppProps {
    currentUser: User;
    allUnits: Unit[];
    unitPermissions: Record<string, any>;
    activeUnitId: string | null;
    allPermissions: RolePermissions;
    canGenerateInvites: boolean;
}

type AdminPage = 'users' | 'invites' | 'units' | 'positions' | 'permissions' | 'notifications';

export const AdminisztracioApp: React.FC<AdminisztracioAppProps> = (props) => {
    const [activePage, setActivePage] = useState<AdminPage>('users');

    const menuItems = [
        { id: 'users', label: 'Felhasználók', icon: UsersIcon, permission: true },
        { id: 'invites', label: 'Meghívók', icon: InvitationIcon, permission: props.canGenerateInvites },
        { id: 'units', label: 'Üzletek', icon: BuildingIcon, permission: props.currentUser.role === 'Admin' },
        { id: 'positions', label: 'Pozíciók', icon: BriefcaseIcon, permission: true },
        { id: 'permissions', label: 'Jogosultságok', icon: ShieldIcon, permission: props.currentUser.role === 'Admin' },
        { id: 'notifications', label: 'Értesítések', icon: BellIcon, permission: true },
    ];

    const renderActivePage = () => {
        switch (activePage) {
            case 'users': return <FelhasznalokApp {...props} />;
            case 'invites': return <MeghivokApp {...props} />;
            case 'units': return <EgysegekApp {...props} />;
            case 'positions': return <PoziciokApp {...props} />;
            case 'permissions': return <JogosultsagokApp {...props} />;
            case 'notifications': return <NotificationSettings {...props} />;
            default: return <FelhasznalokApp {...props} />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-full bg-gray-50">
            <aside className="w-full md:w-64 bg-white border-r p-4 flex-shrink-0">
                <nav className="space-y-2">
                    {menuItems.filter(item => item.permission).map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActivePage(item.id as AdminPage)}
                            className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                                activePage === item.id ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <item.icon className="h-6 w-6 mr-3" />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {renderActivePage()}
            </main>
        </div>
    );
};
