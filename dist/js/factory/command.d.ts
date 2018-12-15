/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Command factory
 */
import Command from '../interface/command';
declare const _default: {
    create: (name: any, ...args: any[]) => Command;
    register: (command: any) => void;
};
export default _default;
