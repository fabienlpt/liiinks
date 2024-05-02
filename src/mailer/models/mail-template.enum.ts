export enum EnumMailTemplate {
  Create_account_ok = "create_account_ok.html",
  Magic_link = "magic_link.html",
}

export function getMailSubject(template: EnumMailTemplate): string {
  switch (template) {
    case EnumMailTemplate.Create_account_ok:
      return `Bienvenue sur Liiinks`;
    case EnumMailTemplate.Magic_link:
      return `Votre lien de connexion`;
    default:
      return "";
  }
}
