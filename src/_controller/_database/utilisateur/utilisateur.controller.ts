import { Controller } from '@nestjs/common'
import { ModelController } from 'src/_controller/_database/_model.controller'
import { Utilisateur } from '../_entity/utilisateur/utilisateur.entity'
import * as path from 'path'

@Controller(__dirname.split(path.sep).pop())
export class UtilisateurController extends ModelController<Utilisateur> {
}
