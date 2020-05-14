import { Resource } from "../api/resource";
import { Action } from "./action";
import { API } from "../api/api";
import * as fs from 'fs';

export type NewCertificate = {
    pfx: string, 
    password: string
};

export type UpdateCertificate = {
    pfx: string, 
    password: string
};

export class Certificate extends Resource {
    
    getResourceEndpoint() {
        return 'certificates';
    }

    constructor(API: API) {
        super(API);
    }

    /**
     * consultarPorId
     */
    public async consultarPorId(id: number): Promise<any> {
        return await this.getAPI().get(`${this.getResourceEndpoint()}/${id}`, {}, {}, true);
    }

    /**
     * cadastrarNovoCertificado
     */
    public async cadastrarNovoCertificado(certificate: NewCertificate): Promise<any> {
        let attachs = this.validateCertificate(certificate);
        return await this.getAPI().post(`${this.getResourceEndpoint()}`, certificate, {} , {}, attachs, true);
    }

    /**
     * atualizarCertificado
     */
    public async atualizarCertificado(certificate_id: number, certificate: UpdateCertificate): Promise<any> {
        let attachs = this.validateCertificate(certificate);
        return await this.getAPI().post(`${this.getResourceEndpoint()}/${certificate_id}`, certificate, {} , {}, attachs, true);
    }

    /**
     * excluirCertificado
     */
    public async excluirCertificado(certificate_id: number): Promise<any> {
        return await this.getAPI().delete(`${this.getResourceEndpoint()}/${certificate_id}`, {}, {}, true);
    }

    private validateCertificate(certificate: UpdateCertificate) {
        let attachs = null;
        if (certificate.pfx) {
            const file_path = certificate.pfx;

            if (!fs.existsSync(file_path)) {
                throw "O caminho do arquivo informado é inválido!";
            }

            delete certificate['pfx'];
            
            attachs = { field_name: 'pfx', files: file_path } ;
        }
        return attachs;
    }
}