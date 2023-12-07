class User {
    skills: string[] = [];

    addSkill(skill: string): void;
    addSkill(skills: string[]): void;

    addSkill(skillOrSkills: string | string[]): void {
        if (typeof skillOrSkills === 'string') {
            this.skills.push(skillOrSkills);
        } else {
            this.skills.push(...skillOrSkills);
        }
    }
}

const user = new User();

user.addSkill('dev');

user.addSkill(['devops', 'design']);
