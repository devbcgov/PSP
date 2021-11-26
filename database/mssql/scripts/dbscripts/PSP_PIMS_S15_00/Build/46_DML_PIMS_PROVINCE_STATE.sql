/* -----------------------------------------------------------------------------
Delete all data from the PIMS_PROVINCE_STATE table and repopulate.
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
Author        Date         Comment
------------  -----------  -----------------------------------------------------
Doug Filteau  2021-Jul-09  Initial version
----------------------------------------------------------------------------- */

DELETE FROM PIMS_PROVINCE_STATE
GO

INSERT INTO PIMS_PROVINCE_STATE (PROVINCE_STATE_ID, PROVINCE_STATE_CODE, DESCRIPTION, COUNTRY_ID, DISPLAY_ORDER)
VALUES
  (1, N'BC', N'British Columbia', 1, 10),
  (2, N'AB', N'Alberta', 1, 20),
  (3, N'MB', N'Manitoba', 1, 30),
  (4, N'NL', N'Newfoundland', 1, 40),
  (5, N'NB', N'New Brunswick', 1, 50),
  (6, N'NS', N'Nova Scotia', 1, 60),
  (7, N'NT', N'North West Territories', 1, 70),
  (8, N'NU', N'Nunavut', 1, 80),
  (9, N'ON', N'Ontario', 1, 90),
  (10, N'PE', N'Prince Edward Island', 1, 100),
  (11, N'QC', N'Quebec', 1, 110),
  (12, N'SK', N'Saskatchewan', 1, 120),
  (13, N'YT', N'Yukon Territory', 1, 130),
  (14, N'AK', N'Alaska', 2, 140),
  (15, N'AL', N'Alabama', 2, 150),
  (16, N'AR', N'Arkansas', 2, 160),
  (17, N'AZ', N'Arizona', 2, 170),
  (18, N'CA', N'California', 2, 180),
  (19, N'CO', N'Colorado', 2, 190),
  (20, N'CT', N'Connecticut', 2, 200),
  (21, N'DC', N'District Of Columbia', 2, 210),
  (22, N'DE', N'Delaware', 2, 220),
  (23, N'FL', N'Florida', 2, 230),
  (24, N'GA', N'Georgia', 2, 240),
  (25, N'HI', N'Hawaii', 2, 250),
  (26, N'IA', N'Iowa', 2, 260),
  (27, N'ID', N'Idaho', 2, 270),
  (28, N'IL', N'Illinois', 2, 280),
  (29, N'IN', N'Indiana', 2, 290),
  (30, N'KS', N'Kansas', 2, 300),
  (31, N'KY', N'Kentucky', 2, 310),
  (32, N'LA', N'Louisiana', 2, 320),
  (33, N'MA', N'Massachusetts', 2, 330),
  (34, N'MD', N'Maryland', 2, 340),
  (35, N'ME', N'Maine', 2, 350),
  (36, N'MI', N'Michigan', 2, 360),
  (37, N'MN', N'Minnesota', 2, 370),
  (38, N'MO', N'Missouri', 2, 380),
  (39, N'MS', N'Mississippi', 2, 390),
  (40, N'MT', N'Montana', 2, 400),
  (41, N'NC', N'North Carolina', 2, 410),
  (42, N'ND', N'North Dakota', 2, 420),
  (43, N'NE', N'Nebraska', 2, 430),
  (44, N'NH', N'New Hampshire', 2, 440),
  (45, N'NJ', N'New Jersey', 2, 450),
  (46, N'NM', N'New Mexico', 2, 460),
  (47, N'NV', N'Nevada', 2, 470),
  (48, N'NY', N'New York', 2, 480),
  (49, N'OH', N'Ohio', 2, 490),
  (50, N'OK', N'Oklahoma', 2, 500),
  (51, N'OR', N'Oregon', 2, 510),
  (52, N'PA', N'Pennsylvania', 2, 520),
  (53, N'RI', N'Rhode Island', 2, 530),
  (54, N'SC', N'South Carolina', 2, 540),
  (55, N'SD', N'South Dakota', 2, 550),
  (56, N'TN', N'Tennessee', 2, 560),
  (57, N'TX', N'Texas', 2, 570),
  (58, N'UT', N'Utah', 2, 580),
  (59, N'VA', N'Virginia', 2, 590),
  (60, N'VT', N'Vermont', 2, 600),
  (61, N'WA', N'Washington', 2, 610),
  (62, N'WI', N'Wisconsin', 2, 620),
  (63, N'WV', N'West Virginia', 2, 630),
  (64, N'WY', N'Wyoming', 2, 640),
  (65, N'MX', N'Mexico', 3, 900),
  (78, N'OTHER', N'Other', 4, 99995),
  (79, N'XX', N'Unknown', 4, 99999);
GO