-- =============================================================================
-- PROJECT: AFRIMÉTIERS HUB - African Skills Olympics 2026
-- COMPONENT: MySQL 8.0+ Database Schema, Triggers, Seed Data & Control Queries
-- ENCODING: UTF8MB4 (Full French & Arabic Bilingual Support)
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS afrimetiers_hub;
CREATE DATABASE afrimetiers_hub
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE afrimetiers_hub;

-- -----------------------------------------------------------------------------
-- 1. TABLE: admins (Committee & Administration Space Users)
-- -----------------------------------------------------------------------------
CREATE TABLE admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    password_hash VARCHAR(255) NOT NULL COMMENT 'Bcrypt/Argon2id hash',
    role ENUM('SuperAdmin', 'MembreComite') NOT NULL DEFAULT 'MembreComite',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    last_login_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uk_admins_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. TABLE: categories (Bilingual Craft Sectors FR / AR)
-- -----------------------------------------------------------------------------
CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(80) NOT NULL,
    name_fr VARCHAR(120) NOT NULL,
    name_ar VARCHAR(120) NOT NULL,
    description_fr TEXT NULL,
    description_ar TEXT NULL,
    icon_code VARCHAR(60) NOT NULL DEFAULT 'hammer',
    display_order SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_categories_slug UNIQUE (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. TABLE: artisans (Bilingual Artisan Profiles & Publication Status)
-- -----------------------------------------------------------------------------
CREATE TABLE artisans (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    matricule VARCHAR(30) NOT NULL COMMENT 'Unique Olympiad Artisan Code e.g. ART-2026-001',
    category_id INT UNSIGNED NOT NULL,
    full_name_fr VARCHAR(150) NOT NULL,
    full_name_ar VARCHAR(150) NOT NULL,
    workshop_name_fr VARCHAR(150) NULL,
    workshop_name_ar VARCHAR(150) NULL,
    specialty_fr VARCHAR(180) NOT NULL,
    specialty_ar VARCHAR(180) NOT NULL,
    bio_fr TEXT NOT NULL,
    bio_ar TEXT NOT NULL,
    country_code CHAR(2) NOT NULL COMMENT 'ISO 3166-1 alpha-2 e.g. MA, SN, DZ, TN, CI, EG',
    country_fr VARCHAR(100) NOT NULL,
    country_ar VARCHAR(100) NOT NULL,
    city_fr VARCHAR(100) NOT NULL,
    city_ar VARCHAR(100) NOT NULL,
    phone VARCHAR(35) NOT NULL,
    email VARCHAR(160) NULL,
    whatsapp VARCHAR(35) NULL,
    years_experience TINYINT UNSIGNED NOT NULL DEFAULT 1,
    starting_price DECIMAL(10, 2) NULL DEFAULT 0.00,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    avatar_url VARCHAR(500) NULL,
    cover_url VARCHAR(500) NULL,
    is_featured TINYINT(1) NOT NULL DEFAULT 0,
    status ENUM('Brouillon', 'En attente', 'Publié', 'Suspendu') NOT NULL DEFAULT 'En attente',
    validated_by INT UNSIGNED NULL,
    published_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uk_artisans_matricule UNIQUE (matricule),
    CONSTRAINT fk_artisans_category FOREIGN KEY (category_id)
        REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_artisans_validator FOREIGN KEY (validated_by)
        REFERENCES admins (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT chk_artisans_experience CHECK (years_experience >= 0 AND years_experience <= 80)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Performance Indexes for Multi-Criteria Public Search
CREATE INDEX idx_artisans_public_search
    ON artisans (status, category_id, country_code, city_fr);
CREATE INDEX idx_artisans_featured
    ON artisans (status, is_featured);
CREATE INDEX idx_artisans_location_ar
    ON artisans (status, country_ar, city_ar);

-- -----------------------------------------------------------------------------
-- 4. TABLE: portfolio_items (Artisan Gallery / Craft Works)
-- -----------------------------------------------------------------------------
CREATE TABLE portfolio_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT UNSIGNED NOT NULL,
    title_fr VARCHAR(160) NOT NULL,
    title_ar VARCHAR(160) NOT NULL,
    description_fr VARCHAR(400) NULL,
    description_ar VARCHAR(400) NULL,
    image_url VARCHAR(500) NOT NULL,
    estimated_price DECIMAL(10, 2) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_portfolio_artisan FOREIGN KEY (artisan_id)
        REFERENCES artisans (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. TABLE: quote_requests (Demandes de Devis)
-- -----------------------------------------------------------------------------
CREATE TABLE quote_requests (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(32) NOT NULL COMMENT 'Unique Quote Reference e.g. DEV-2026-0001',
    artisan_id INT UNSIGNED NOT NULL,
    client_name VARCHAR(140) NOT NULL,
    client_email VARCHAR(160) NOT NULL,
    client_phone VARCHAR(40) NOT NULL,
    client_country VARCHAR(100) NOT NULL,
    service_title VARCHAR(200) NOT NULL,
    project_description TEXT NOT NULL,
    estimated_budget DECIMAL(12, 2) NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    desired_deadline DATE NULL,
    preferred_lang ENUM('fr', 'ar') NOT NULL DEFAULT 'fr',
    status ENUM('Nouvelle', 'En cours', 'Acceptée', 'Refusée', 'Clôturée') NOT NULL DEFAULT 'Nouvelle',
    admin_notes TEXT NULL,
    handled_by INT UNSIGNED NULL,
    processed_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uk_quote_requests_reference UNIQUE (reference),
    CONSTRAINT fk_quote_requests_artisan FOREIGN KEY (artisan_id)
        REFERENCES artisans (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_quote_requests_admin FOREIGN KEY (handled_by)
        REFERENCES admins (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT chk_quote_budget_positive CHECK (estimated_budget IS NULL OR estimated_budget >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_quotes_artisan_status ON quote_requests (artisan_id, status);
CREATE INDEX idx_quotes_status_created ON quote_requests (status, created_at DESC);

-- =============================================================================
-- BUSINESS RULES ENFORCEMENT (TRIGGERS & VIEWS)
-- =============================================================================

DELIMITER $$

-- BUSINESS RULE 1 & 2: A quote request can ONLY be linked to an artisan whose
-- status is 'Publié'. Also auto-generates a unique reference if omitted.
CREATE TRIGGER trg_quote_requests_before_insert
BEFORE INSERT ON quote_requests
FOR EACH ROW
BEGIN
    DECLARE v_artisan_status VARCHAR(20);

    -- Check that target artisan exists and is published
    SELECT status INTO v_artisan_status
    FROM artisans
    WHERE id = NEW.artisan_id
    LIMIT 1;

    IF v_artisan_status IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'ERREUR METIER: L''artisan spécifié est introuvable.';
    END IF;

    IF v_artisan_status <> 'Publié' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'ERREUR METIER: Une demande de devis ne peut être associée qu''à un artisan ayant le statut "Publié".';
    END IF;

    -- Force initial status to 'Nouvelle' on creation
    SET NEW.status = 'Nouvelle';
END$$

-- BUSINESS RULE 4: State machine constraint - Once a quote request has left
-- the 'Nouvelle' status, it can NEVER revert back to 'Nouvelle'.
CREATE TRIGGER trg_quote_requests_before_update
BEFORE UPDATE ON quote_requests
FOR EACH ROW
BEGIN
    IF OLD.status <> 'Nouvelle' AND NEW.status = 'Nouvelle' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'ERREUR MACHINE A ETATS: Une demande de devis déjà traitée ne peut pas revenir au statut "Nouvelle".';
    END IF;

    -- Record processing timestamp on first transition out of 'Nouvelle'
    IF OLD.status = 'Nouvelle' AND NEW.status <> 'Nouvelle' AND NEW.processed_at IS NULL THEN
        SET NEW.processed_at = NOW();
    END IF;
END$$

-- Automatically stamp published_at when an artisan transitions to 'Publié'
CREATE TRIGGER trg_artisans_before_update
BEFORE UPDATE ON artisans
FOR EACH ROW
BEGIN
    IF OLD.status <> 'Publié' AND NEW.status = 'Publié' AND NEW.published_at IS NULL THEN
        SET NEW.published_at = NOW();
    END IF;
END$$

DELIMITER ;

-- BUSINESS RULE 1 VIEW: Public Directory View strictly exposing 'Publié' artisans
CREATE OR REPLACE VIEW v_public_artisans AS
SELECT
    a.id,
    a.matricule,
    a.category_id,
    c.slug AS category_slug,
    c.name_fr AS category_name_fr,
    c.name_ar AS category_name_ar,
    a.full_name_fr,
    a.full_name_ar,
    a.workshop_name_fr,
    a.workshop_name_ar,
    a.specialty_fr,
    a.specialty_ar,
    a.bio_fr,
    a.bio_ar,
    a.country_code,
    a.country_fr,
    a.country_ar,
    a.city_fr,
    a.city_ar,
    a.years_experience,
    a.starting_price,
    a.currency,
    a.avatar_url,
    a.cover_url,
    a.is_featured,
    a.published_at
FROM artisans a
INNER JOIN categories c ON c.id = a.category_id
WHERE a.status = 'Publié' AND c.is_active = 1;

-- =============================================================================
-- SEED DATA (Bilingual French & Arabic Test Dataset)
-- =============================================================================

INSERT INTO admins (id, full_name, email, password_hash, role) VALUES
(1, 'Pr. Karim Benmahmoud', 'direction@afrimetiers-alger2026.dz', '$2b$12$K9xQ7eR5v8L1m2N3p4Q5r6S7t8U9v0W1x2Y3z4A5b6C7d8E9f0G1', 'SuperAdmin'),
(2, 'Salma Benali', 'comite.evaluation@afrimetiers-alger2026.dz', '$2b$12$K9xQ7eR5v8L1m2N3p4Q5r6S7t8U9v0W1x2Y3z4A5b6C7d8E9f0G1', 'MembreComite');

INSERT INTO categories (id, slug, name_fr, name_ar, description_fr, description_ar, icon_code, display_order) VALUES
(1, 'tapis-mzab-mensoudj', 'Tapis du M''zab & Soierie Mensoudj', 'زرابي ميزاب والحرير المنسوج التلمساني', 'Tapis de Ghardaïa (UNESCO), Hanbel et soierie Mensoudj de Tlemcen.', 'زرابي غرداية (وادي ميزاب)، الحنبل والحرير التلمساني الأصيل.', 'scissors', 1),
(2, 'majboud-karakou-cuir', 'Broderie Majboud, Karakou & Sellerie', 'المجبود القسنطيني، الكاراكو والسروج', 'Haute broderie au fil d''or (Majboud et Fetla) de Constantine et d''Alger.', 'التطريز الرفيع بخيط الذهب (المجبود والفتلة) بقسنطينة والجزائر العاصمة.', 'briefcase', 2),
(3, 'ebenisterie-sculpture-atlas', 'Ébénisterie & Cèdre Ciselé de l''Atlas', 'النجارة الفنية ونقش خشب الأرز الأطلسي', 'Sculpture sur bois de cèdre, mobilier ciselé et selles Rahla du Hoggar.', 'النحت على خشب الأرز، الأثاث المنقوش والصناعات الصحراوية بالأهقار.', 'layers', 3),
(4, 'bijouterie-ath-yenni-hoggar', 'Bijouterie d''Ath Yenni & Argent du Hoggar', 'حلي آث يني والفضة الطوارقية بالأهقار', 'Argent massif émaillé et corail rouge d''Ath Yenni, orfèvrerie de Tamanrasset.', 'الفضة المينائية والمرجان الأحمر الحر بآث يني والحلي الفضية بتمنراست.', 'gem', 4),
(5, 'dinanderie-casbah-zellige', 'Dinanderie de la Casbah & Zellige', 'النحاس الفني بالقصبة والزليج الجزائري', 'Grands plateaux Sniwa en cuivre ciselé de la Casbah d''Alger et zellige de Tlemcen.', 'صواني السنيوة النحاسية المنقوشة بقصبة الجزائر والزليج التلمساني.', 'award', 5);

INSERT INTO artisans (
    id, matricule, category_id,
    full_name_fr, full_name_ar, workshop_name_fr, workshop_name_ar,
    specialty_fr, specialty_ar, bio_fr, bio_ar,
    country_code, country_fr, country_ar, city_fr, city_ar,
    phone, email, whatsapp, years_experience, starting_price, currency,
    is_featured, status, validated_by, published_at
) VALUES
(1, 'ART-DZ-2026-001', 5,
 'Maâlem Khaled Benmansour', 'المعلم خالد بن منصور',
 'Dar El Nahas — Casbah d''Alger', 'ورشة دار النحاس — قصبة الجزائر',
 'Dinanderie d''Art, Grands Plateaux Sniwa en Cuivre Ciselé & Lustres', 'النحاس الفني المنقوش، صواني السنيوة الملكية والثريات العاصمية',
 'Maître dinandier de 3ème génération au cœur de la Casbah d''Alger, spécialisé dans la ciselure de grands plateaux Sniwa, aiguières et lustres monumentaux.',
 'معلم حرفي في النقش على النحاس من الجيل الثالث بقلب قصبة الجزائر، متخصص في إبداع صواني السنيوة الملكية والثريات النحاسية.',
 'DZ', 'Algérie', 'الجزائر', 'Alger', 'الجزائر العاصمة',
 '+213 5 50 12 34 56', 'k.benmansour@darnahas-casbah.dz', '+213550123456', 24, 420.00, 'DZD',
 1, 'Publié', 1, '2026-10-15 10:00:00'),

(2, 'ART-DZ-2026-002', 2,
 'Nour El Houda Mansouri', 'نور الهدى المنصوري',
 'Maison du Majboud & Karakou — Constantine', 'دار المجبود والفرقاني والكاراكو — قسنطينة',
 'Haute Broderie au Fil d''Or (Majboud & Fetla) & Maroquinerie Royale', 'التطريز الرفيع بخيط الذهب (المجبود والفتلة) والجلود الملكية',
 'Maître brodeuse sur cuir et velours à Constantine, perpétuant l''art séculaire du Majboud au fil d''or pour coffrets diplomatiques et tenues d''art.',
 'معلمة حرفية في تطريز المجبود والفتلة بقسنطينة، تحافظ على فن التطريز بخيوط الذهب والفضة على المخمل والجلد.',
 'DZ', 'Algérie', 'الجزائر', 'Constantine', 'قسنطينة',
 '+213 6 61 23 45 67', 'nour.mansouri@majboud-constantine.dz', '+213661234567', 19, 350.00, 'DZD',
 1, 'Publié', 1, '2026-10-18 14:30:00'),

(3, 'ART-DZ-2026-003', 4,
 'Amokrane Aït Menguellet', 'أمقران آيت منقلات',
 'Atelier Taos — Orfèvrerie d''Ath Yenni (Kabylie)', 'ورشة طاوس — صياغة الفضة والمرجان بآث يني (تيزي وزو)',
 'Bijouterie Kabyle en Argent Massif Émaillé & Corail Rouge d''El Kala', 'الحلي القبائلية بالفضة الخالصة المينائية والمرجان الأحمر الحر',
 'Maître bijoutier à Ath Yenni (Wilaya de Tizi Ouzou), maîtrisant la fusion des émaux polychromes et le sertissage du corail rouge naturel d''El Kala.',
 'معلم صائغ بقرية آث يني العريقة (ولاية تيزي وزو)، يتقن فن الفضة المزججة بالمينا الملونة والفيليغران المرصع بالمرجان الأحمر الجزائري.',
 'DZ', 'Algérie', 'الجزائر', 'Tizi Ouzou', 'تيزي وزو (آث يني)',
 '+213 5 55 88 99 00', 'amokrane@bijoux-athyenni.dz', '+213555889900', 21, 280.00, 'DZD',
 1, 'Publié', 2, '2026-10-20 09:15:00'),

(4, 'ART-DZ-2026-004', 1,
 'Cheikh Brahim Ould Slimane', 'الشيخ إبراهيم ولد سليمان',
 'Tissages de la Pentapole — Vallée du M''zab (Ghardaïa)', 'منسوجات وادي ميزاب — غرداية',
 'Tapis Traditionnel de Ghardaïa (Haute Laine) & Symboles Géométriques', 'الزربية الميزابية الأصيلة بغرداية والنسيج الصوفي الفاخر',
 'Maître tisserand à Ghardaïa (Vallée du M''zab classée UNESCO), perpétuant le tissage en pure laine vierge teinte aux pigments végétaux.',
 'معلم نساج بغرداية (وادي ميزاب المصنف لدى اليونسكو)، يحافظ على حياكة الزرابي الصوفية الخالصة المصبوغة بالنباتات الطبيعية.',
 'DZ', 'Algérie', 'الجزائر', 'Ghardaïa', 'غرداية',
 '+213 6 62 44 55 66', 'brahim.mzab@tapis-ghardaia.dz', '+213662445566', 26, 310.00, 'DZD',
 1, 'Publié', 1, '2026-10-25 11:00:00'),

(5, 'ART-TN-2026-005', 5,
 'Maâlem Youssef El Kairouani', 'المعلم يوسف القيرواني',
 'Atelier Dar Qallaline Nabeul', 'ورشة دار القلالين نابل',
 'Céramique Qallaline & Faïence Polychrome de Nabeul', 'خزف القلالين والفسيفساء الهندسية بنابل',
 'Maître céramiste à Nabeul représentant la délégation tunisienne aux Olympiades d''Alger 2026.',
 'معلم حرفي في الخزف والقلالين بنابل يمثل الوفد التونسي في أولمبياد الجزائر 2026.',
 'TN', 'Tunisie', 'تونس', 'Nabeul', 'نابل',
 '+216 72 23 45 67', 'youssef.kairouani@darqallaline.tn', '+21672234567', 20, 290.00, 'TND',
 1, 'Publié', 1, '2026-10-28 11:00:00'),

(6, 'ART-SN-2026-006', 1,
 'Aïssatou Ndiaye', 'عيساتو ندياي',
 'Tissages Royaux du Sahel — Dakar', 'المنسوجات الملكية للساحل — داكار',
 'Tissage Manjak & Bogolan contemporain', 'نسيج المانجاك والبوغولان المعاصر',
 'Créatrice textile primée à Dakar représentant la délégation sénégalaise aux Olympiades d''Alger 2026.',
 'مبدعة نسيج في داكار تمثل الوفد السنغالي بالجزائر.',
 'SN', 'Sénégal', 'السنغال', 'Dakar', 'داكار',
 '+221 77 456 78 90', 'aissatou@tissages-sahel.sn', '+221774567890', 14, 180.00, 'XOF',
 1, 'Publié', 1, '2026-10-30 14:30:00'),

(7, 'ART-NE-2026-007', 4,
 'Idriss Ag Mohamed', 'إدريس آغ محمد',
 'Forge d''Argent d''Agadez', 'صياغة الفضة أغاديز',
 'Orfèvrerie Saharienne & Gravure Tifinagh sur Argent', 'الصياغة الصحراوية والنقش بالتيفيناغ على الفضة',
 'Héritier du savoir-faire des forgerons de l''Aïr, façonnant des bijoux en argent massif gravés au burin.',
 'وريث مهارة صناع الفضة في أغاديز، يصيغ حلياً من الفضة الخالصة المنقوشة.',
 'NE', 'Niger', 'النيجر', 'Agadez', 'أغاديز',
 '+227 90 11 22 33', 'idriss.silver@agadez-art.ne', '+22790112233', 18, 140.00, 'XOF',
 0, 'Publié', 2, '2026-11-01 09:15:00'),

(8, 'ART-CI-2026-008', 3,
 'Koffi Kouamé', 'كوفي كوامي',
 'Ébène Royal Grand-Bassam — Abidjan', 'الأبنوس الملكي غراند بسام — أبيدجان',
 'Sculpture Akan sur bois d''ébène et acajou', 'نحت الأكان على خشب الأبنوس والماهوغاني',
 'Sculpteur maître d''atelier à Abidjan et Grand-Bassam, spécialisé dans le mobilier d''art et les portes monumentales.',
 'نحات ومعلم ورشة في أبيدجان وغراند بسام، متخصص في الأثاث الفني والأبواب الصرحية.',
 'CI', 'Côte d''Ivoire', 'ساحل العاج', 'Abidjan', 'أبيدجان',
 '+225 07 08 09 10 11', 'koffi@ebeneroyal.ci', '+2250708091011', 16, 320.00, 'XOF',
 0, 'Publié', 1, '2026-11-02 11:00:00'),

(9, 'ART-DZ-2026-009', 5,
 'Yacine Boumediene', 'ياسين بومدين',
 'Atelier El Mechouar — Zellige & Cèdre de Tlemcen', 'ورشة المشوار — الزليج وخشب الأرز بتلمسان',
 'Zellige Tlemcénien, Poterie Vernissée & Moucharabieh en Cèdre', 'الزليج التلمساني، الفخار المزجج والمشربيات بخشب الأرز',
 'Spécialiste de la mosaïque de faïence tlemcénienne et du bois de cèdre sculpté pour l''architecture arabo-andalouse.',
 'متخصص في الزليج التلمساني الأصيل ونقش خشب الأرز للعمارة الأندلسية.',
 'DZ', 'Algérie', 'الجزائر', 'Tlemcen', 'تلمسان',
 '+213 5 40 77 88 99', 'yacine@mechouar-tlemcen.dz', '+213540778899', 14, 290.00, 'DZD',
 0, 'En attente', NULL, NULL);

INSERT INTO quote_requests (
    reference, artisan_id, client_name, client_email, client_phone, client_country,
    service_title, project_description, estimated_budget, currency, desired_deadline,
    preferred_lang, status, admin_notes, handled_by, processed_at
) VALUES
('DEV-2026-0001', 1, 'Hôtel El Aurassi — Direction Patrimoine', 'patrimoine@el-aurassi.dz', '+213 21 74 82 52', 'Alger, Algérie',
 '2 Lustres Monumentaux & 4 Grands Plateaux Sniwa en Cuivre Ciselé de la Casbah',
 'Création sur mesure pour le hall d''honneur avec arabesques florales algéroises.',
 7800.00, 'DZD', '2027-02-15', 'fr', 'En cours', 'Dossier technique transmis à Maâlem Khaled Benmansour.', 1, '2026-11-10 11:20:00'),

('DEV-2026-0002', 2, 'Samira Toumi — Ministère de la Culture', 'samira.toumi@culture.gov.dz', '+213 6 61 99 88 77', 'Constantine, Algérie',
 '25 Coffrets Protocolaires en Velours & Broderie d''Or Majboud de Constantine',
 'Réalisation de 25 coffrets protocolaires personnalisés pour le sommet culturel d''Alger.',
 9500.00, 'DZD', '2027-03-01', 'ar', 'Acceptée', 'Devis validé, acompte versé à l''atelier de Constantine.', 1, '2026-11-12 09:45:00'),

('DEV-2026-0003', 3, 'Galerie Numidia Paris-Alger', 'contact@galerie-numidia.dz', '+213 5 52 11 22 33', 'Tizi Ouzou, Algérie',
 'Collection de 8 Parures Kabyles en Argent Émaillé & Corail d''Ath Yenni',
 'Pour l''exposition annuelle du salon national de l''orfèvrerie d''Ath Yenni.',
 6400.00, 'DZD', '2027-01-20', 'fr', 'Nouvelle', NULL, NULL, NULL),

('DEV-2026-0004', 4, 'Riad Oasis du Sud', 'direction@oasis-ghardaia.dz', '+213 6 60 33 44 55', 'Ghardaïa, Algérie',
 '6 Grands Tapis Traditionnels du M''zab en Pure Laine Vierge',
 'Tissage traditionnel haute laine avec motifs géométriques de la Pentapole de Ghardaïa.',
 5200.00, 'DZD', '2027-01-30', 'ar', 'Nouvelle', NULL, NULL, NULL),

('DEV-2026-0005', 5, 'Fondation Culturelle du Hoggar', 'contact@fondation-hoggar.dz', '+213 6 68 44 55 66', 'Tamanrasset, Algérie',
 'Parures en argent massif gravé Tifinagh & Coffrets en cuir du Hoggar',
 'Collaboration pour une collection patrimoniale de 12 pièces d''orfèvrerie touarègue de Tamanrasset.',
 3900.00, 'DZD', '2027-02-10', 'fr', 'En cours', 'Vérification des délais d''expédition depuis Tamanrasset.', 2, '2026-11-15 15:00:00');

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- 4+ CONTROL & VALIDATION SQL QUERIES (OLYMPICS EVALUATION REQUIREMENTS)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- QUERY 1: Multi-criteria search of PUBLISHED Algerian artisans
-- Filters by optional category slug, country code ('DZ'), wilaya/city, and keyword
-- Strictly enforces Business Rule #1 (status = 'Publié').
-- -----------------------------------------------------------------------------
SELECT
    a.matricule,
    a.full_name_fr,
    a.full_name_ar,
    c.name_fr AS categorie_fr,
    c.name_ar AS categorie_ar,
    a.country_fr,
    a.city_fr AS wilaya_fr,
    a.years_experience,
    a.starting_price,
    a.currency
FROM artisans a
INNER JOIN categories c ON c.id = a.category_id
WHERE a.status = 'Publié'
  AND ('dinanderie-casbah-zellige' IS NULL OR c.slug = 'dinanderie-casbah-zellige')
  AND ('DZ' IS NULL OR a.country_code = 'DZ')
  AND ('Alger' IS NULL OR a.city_fr LIKE CONCAT('%', 'Alger', '%') OR a.city_ar LIKE CONCAT('%', 'الجزائر', '%'))
ORDER BY a.is_featured DESC, a.years_experience DESC;

-- -----------------------------------------------------------------------------
-- QUERY 2: Count of artisans per country (Published vs. Total Registered)
-- Useful for the Committee Dashboard geographical distribution KPI.
-- -----------------------------------------------------------------------------
SELECT
    a.country_code,
    a.country_fr AS pays_fr,
    a.country_ar AS pays_ar,
    COUNT(a.id) AS total_artisans,
    SUM(CASE WHEN a.status = 'Publié' THEN 1 ELSE 0 END) AS artisans_publies,
    SUM(CASE WHEN a.status = 'En attente' THEN 1 ELSE 0 END) AS artisans_en_attente
FROM artisans a
GROUP BY a.country_code, a.country_fr, a.country_ar
ORDER BY artisans_publies DESC, total_artisans DESC;

-- -----------------------------------------------------------------------------
-- QUERY 3: Top 5 most requested PUBLISHED artisans (with quote metrics & budget)
-- Ranks published artisans by number of incoming quotation requests.
-- -----------------------------------------------------------------------------
SELECT
    a.matricule,
    a.full_name_fr,
    a.full_name_ar,
    c.name_fr AS categorie,
    a.country_fr AS pays,
    COUNT(q.id) AS total_demandes_devis,
    SUM(CASE WHEN q.status = 'Nouvelle' THEN 1 ELSE 0 END) AS demandes_nouvelles,
    SUM(CASE WHEN q.status IN ('En cours', 'Acceptée', 'Clôturée') THEN 1 ELSE 0 END) AS demandes_traitees,
    COALESCE(SUM(q.estimated_budget), 0.00) AS volume_budget_estime_usd
FROM artisans a
INNER JOIN categories c ON c.id = a.category_id
LEFT JOIN quote_requests q ON q.artisan_id = a.id
WHERE a.status = 'Publié'
GROUP BY a.id, a.matricule, a.full_name_fr, a.full_name_ar, c.name_fr, a.country_fr
ORDER BY total_demandes_devis DESC, volume_budget_estime_usd DESC
LIMIT 5;

-- -----------------------------------------------------------------------------
-- QUERY 4: Quotation Request Tracking & State Machine Audit by Status
-- Summarizes quote requests per status with average budget and oldest pending request.
-- -----------------------------------------------------------------------------
SELECT
    q.status AS statut_demande,
    COUNT(q.id) AS nombre_demandes,
    ROUND(AVG(q.estimated_budget), 2) AS budget_moyen_usd,
    MIN(q.created_at) AS plus_ancienne_demande,
    MAX(q.created_at) AS plus_recente_demande
FROM quote_requests q
GROUP BY q.status
ORDER BY FIELD(q.status, 'Nouvelle', 'En cours', 'Acceptée', 'Refusée', 'Clôturée');

-- -----------------------------------------------------------------------------
-- QUERY 5: Integrity Check - Verify zero quote requests exist on non-published artisans
-- Must return 0 anomalies to confirm Business Rule #2 compliance.
-- -----------------------------------------------------------------------------
SELECT
    q.reference,
    q.status AS quote_status,
    a.matricule,
    a.full_name_fr,
    a.status AS artisan_status
FROM quote_requests q
INNER JOIN artisans a ON a.id = q.artisan_id
WHERE a.status <> 'Publié';
