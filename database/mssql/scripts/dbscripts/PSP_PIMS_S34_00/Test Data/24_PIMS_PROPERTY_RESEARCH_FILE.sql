DELETE 
FROM   PIMS_PROPERTY_RESEARCH_FILE;
GO

INSERT INTO [dbo].[PIMS_PROPERTY_RESEARCH_FILE] ([RESEARCH_FILE_ID], [PROPERTY_ID], [PROPERTY_NAME], [CONCURRENCY_CONTROL_NUMBER]) 
	VALUES(1, 1, N'Bubba-Lou Who', 1)
GO